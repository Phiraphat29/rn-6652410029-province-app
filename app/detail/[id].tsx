import { supabase } from '@/services/supabase';
import { Festival, Location } from '@/type';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

export default function DetailScreen() {
    const params = useLocalSearchParams<{ id: string; title: string; fromCategory?: string }>();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const fromCategory = Array.isArray(params.fromCategory) ? params.fromCategory[0] : params.fromCategory;
    const isFestival = fromCategory === 'festival';
    const [location, setLocation] = useState<Location>();
    const [festival, setFestival] = useState<Festival>();

    const handleCallPhone = () => {
        if (location?.phone) {
            Linking.openURL(`tel:${location.phone}`);
        }
    }

    const handleOpenGoogleMaps = () => {
        if (location?.latitude && location?.longitude) {
            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`);
        }
    }

    const handleOpenCalendar = () => {
        if (festival?.period) {
            Linking.openURL(`https://www.google.com/calendar/event?action=TEMPLATE&text=${festival?.name}&dates=${festival?.period}`);
        }
    }

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
            <Stack.Screen options={{ headerTitle: "รานละเอียดสถานที่", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'NotoSansThai_700Bold' }, headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#32D67C' } }} />
            {isFestival ? (
                <Image source={{ uri: festival?.image_url }} style={styles.image} />
            ) : (
                <Image source={{ uri: location?.image_url }} style={styles.image} />
            )}
            <View style={styles.contentContainer}>
                {isFestival ? (
                    <View>
                        {/* chip that indicate category of festival */}
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>งานประเพณี</Text>
                        </View>
                        <Text style={styles.title}>{festival?.name}</Text>
                        <Text style={styles.description}>{festival?.description}</Text>
                        <Text style={styles.subtitleBold}>{festival?.period}</Text>
                    </View>
                ) : (
                    <View>
                        {/* chip that indicate category of location */}
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>{location?.category}</Text>
                        </View>
                        <Text style={styles.title}>{location?.name}</Text>
                        <Text style={styles.address}>📍{location?.address}</Text>
                        {location?.phone && <Text style={styles.phone}>☎️ {location?.phone}</Text>}
                        {/* divider */}
                        <View style={styles.divider} />
                        <Text style={styles.subtitleBold}>รายละเอียดร้าน</Text>
                        <Text style={styles.description}>{location?.description}</Text>
                    </View>
                )}
                {location?.phone && <Pressable style={styles.button} onPress={handleCallPhone}>
                    <Text style={styles.buttonText}>ติดต่อเลย</Text>
                </Pressable>}
                {location?.latitude && location?.longitude && <Pressable style={styles.button} onPress={handleOpenGoogleMaps}>
                    <Text style={styles.buttonText}>เปิดใน Google Maps</Text>
                </Pressable>}
                {festival?.period && <Pressable style={styles.button} onPress={handleOpenCalendar}>
                    <Text style={styles.buttonText}>เพิ่มในปฏิทิน</Text>
                </Pressable>}
            </View>
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
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'NotoSansThai_700Bold',
        paddingVertical: 5,
    },
    address: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_400Regular',
        color: '#868686',
        paddingVertical: 5,
    },
    subtitleBold: {
        fontSize: 20,
        fontFamily: 'NotoSansThai_700Bold',
        marginTop: 10,
        paddingBottom: 5,
    },
    description: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_400Regular',
        color: '#000000',
    },
    phone: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#000000',
        paddingVertical: 5,
    },
    button: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#32D67C',
        marginTop: 20,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#32D67C',
        fontSize: 18,
        fontFamily: 'NotoSansThai_700Bold',
    },
    chip: {
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#32D67C',
        marginBottom: 10,
    },
    chipText: {
        color: '#32D67C',
        fontSize: 14,
        fontFamily: 'NotoSansThai_700Bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#868686',
        marginVertical: 10,
    },
})