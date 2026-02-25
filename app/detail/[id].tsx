import { supabase } from '@/services/supabase';
import { Festival, Location } from '@/type';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function DetailScreen() {
    const params = useLocalSearchParams<{ id: string; name: string; fromCategory?: string }>();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const fromCategory = Array.isArray(params.fromCategory) ? params.fromCategory[0] : params.fromCategory;
    const isFestival = fromCategory === 'festival';
    const [location, setLocation] = useState<Location>();
    const [festival, setFestival] = useState<Festival>();

    useEffect(() => {
        const fetchData = async () => {
            if (isFestival) {
                const { data, error } = await supabase.from('festivals').select('*').eq('id', id);
                if (error) {
                    console.error(error);
                } else {
                    setFestival(data?.[0]);
                }
            } else {
                const { data, error } = await supabase.from('locations').select('*').eq('id', id);
                if (error) {
                    console.error(error);
                } else {
                    setLocation(data?.[0]);
                }
            }
        };
        fetchData();
    }, [id, isFestival]);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            {isFestival ? (
                <Image source={{ uri: festival?.image_url }} style={styles.image} />
            ) : (
                <Image source={{ uri: location?.image_url }} style={styles.image} />
            )}
            {isFestival ? (
                <View style={styles.content}>
                    <Text style={styles.title}>{festival?.name}</Text>
                    <Text style={styles.description}>{festival?.description}</Text>
                    <Text style={styles.subtitleBold}>{festival?.period}</Text>
                </View>
            ) : (
                <View style={styles.content}>
                    <Text style={styles.title}>{location?.name}</Text>
                    <Text style={styles.address}>{location?.address}</Text>
                    <Text style={styles.description}>{location?.description}</Text>
                    {location?.phone && <Text style={styles.subtitleBold}>เบอร์ติดต่อ: {location?.phone}</Text>}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'NotoSansThai_700Bold',
        paddingTop: 10,
    },
    address: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_400Regular',
        color: '#868686',
        paddingBottom: 10,
    },
    description: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_400Regular',
        color: '#000000',
        paddingVertical: 10,
    },
    subtitleBold: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_700Bold',
        paddingVertical: 10,
    },
})