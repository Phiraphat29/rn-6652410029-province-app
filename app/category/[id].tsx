import { supabase } from '@/services/supabase';
import { Location } from '@/type';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CategoryScreen() {
    const params = useLocalSearchParams<{ id: string; title: string }>();
    const categoryId = Array.isArray(params.id) ? params.id[0] : params.id;
    const title = Array.isArray(params.title) ? params.title[0] : params.title;
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            if (categoryId === 'festival') {
                const { data, error } = await supabase.from('festivals').select('*');
                if (error) {
                    console.error(error);
                } else {
                    setLocations(data);
                }
            }
            else {
                const { data, error } = await supabase.from('locations').select('*').eq('category', categoryId);
                if (error) {
                    console.error(error);
                } else {
                    setLocations(data);
                }
            }
        };
        fetchAllData();
    }, [categoryId]);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerTitle: "หมวด" + title, headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'NotoSansThai_700Bold' }, headerTintColor: '#FFC107', headerStyle: { backgroundColor: '#0000ff' } }} />
            <View style={styles.locationsContainer}>
                {locations.map((location) => (
                    <Link key={location.id} href={{ pathname: "/detail/[id]", params: { id: location.id, name: location.name, fromCategory: categoryId } }} asChild>
                        <Pressable key={location.id} style={styles.buttonBordered}>
                            <Text style={styles.buttonBorderedText}>{location.name}</Text>
                            {/* if it is festival, don't show the address */}
                            {categoryId === 'festival' ? null : <Text style={styles.addressText}>📍{location.address}</Text>}
                        </Pressable>
                    </Link>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#F7F7F7',
    },
    locationsContainer: {
        flex: 1,

        backgroundColor: '#F7F7F7',
    },
    buttonBordered: {
        padding: 20,
        backgroundColor: 'transparent',
        marginBottom: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#0000FF',
        justifyContent: 'center',
    },
    buttonBorderedText: {
        color: '#0000FF',
        fontSize: 18,
        fontFamily: 'NotoSansThai_700Bold',
    },
    addressText: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#868686',
    },
});