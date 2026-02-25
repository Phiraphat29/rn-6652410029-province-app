import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const categories = [
    { id: 'travel', title: 'สถานที่ท่องเที่ยว', icon: '🌳' },
    { id: 'restaurant', title: 'ร้านอาหาร', icon: '🍛' },
    { id: 'cafe', title: 'ร้านคาเฟ่/ร้านขนม', icon: '☕' },
    { id: 'temple', title: 'วัด/ศาสนสถาน', icon: '🏯' },
    { id: 'festival', title: 'ประเพณี/งานประจำปี', icon: '🎉' },
];

export default function Home() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {categories.map((cat) => (
                <Link key={cat.id} href={{ pathname: "/category/[id]", params: { id: cat.id, title: cat.title } }} asChild>
                    <Pressable style={styles.categoryItem}>
                        <Text style={styles.categoryItemText}>{cat.icon} {cat.title}</Text>
                    </Pressable>
                </Link>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    contentContainer: {
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 40,
    },
    categoryItem: {
        padding: 20,
        backgroundColor: '#0000ff',
        marginBottom: 15,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    categoryItemText: {
        fontSize: 18,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#ffc107',
    },
});