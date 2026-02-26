import { Link } from 'expo-router';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const gap = 12;
const itemWidth = (width - (10 * 2) - gap) / 2;

const categories = [
    { id: 'travel', title: 'สถานที่ท่องเที่ยว', icon: '🌳' },
    { id: 'restaurant', title: 'ร้านอาหาร', icon: '🍛' },
    { id: 'cafe', title: 'ร้านคาเฟ่/ขนม', icon: '☕' },
    { id: 'temple', title: 'วัด/ศาสนสถาน', icon: '🏯' },
    { id: 'festival', title: 'ประเพณี/งานปี', icon: '🎉' },
];

export default function Home() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.gridContainer}>
                {categories.map((cat) => (
                    <Link key={cat.id} href={{ pathname: "/category/[id]", params: { id: cat.id, title: cat.title } }} asChild>
                        {/* last item use all width */}
                        <Pressable style={styles.categoryItem}>
                            <Text style={styles.iconText}>{cat.icon}</Text>
                            <Text style={styles.categoryItemText}>{cat.title}</Text>
                        </Pressable>
                    </Link>
                ))}
            </View>

            <View style={styles.footerCard}>
                <Text style={styles.footerTitle}>เมืองร้อยเอ็ด 🌾</Text>
                <Text style={styles.footerDescription}>
                    "สิบเอ็ดประตูเมืองงาม เรืองนามพระสูงใหญ่ ผ้าไหมสาเกต บุญผะเหวดประเพณี มหาเจดีย์ชัยมงคล งามนฤมลบึงพลาญชัย เขตกุลาสดใส ข้าวมะลิหอมเรืองรอง"
                </Text>

                <View style={styles.tagContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>#หอโหวด101</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>#บึงพลาญชัย</Text>
                    </View>
                </View>
            </View>
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryItem: {
        width: itemWidth,
        height: 120,
        padding: 15,
        marginBottom: gap,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#32D67C',
    },
    iconText: {
        fontSize: 32,
        marginBottom: 8,
    },
    categoryItemText: {
        fontSize: 14,
        color: '#32D67C',
        textAlign: 'center',
        fontFamily: 'NotoSansThai_700Bold',
    },
    footerCard: {
        marginTop: 10,
        padding: 25,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DCFCE7',
    },
    footerTitle: {
        fontSize: 20,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#166534',
        marginBottom: 10,
    },
    footerDescription: {
        fontSize: 14,
        color: '#166534',
        fontFamily: 'NotoSansThai_400Regular',
        lineHeight: 22,
    },
    tagContainer: {
        flexDirection: 'row',
        marginTop: 15,
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#32D67C',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 5,
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'NotoSansThai_700Bold',
    }
});