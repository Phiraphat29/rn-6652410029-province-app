import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.replace('/home')
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/wheat-plant.png')} style={styles.logo} />
      <Text style={styles.title}>เมืองร้อยเอ็ด</Text>
      <Text style={styles.description}>สิบเอ็ดประตูเมืองงาม เรืองนามพระสูงใหญ่ ผ้าไหมสาเกต บุญผะเหวดประเพณี มหาเจดีย์ชัยมงคล งามน่ายลบึงพลาญชัย เขตกว้างไกลทุ่งกุลา โลกลือชาข้าวหอมมะลิ</Text>
      <ActivityIndicator size="large" color="#166534" style={styles.loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSansThai_700Bold',
    marginBottom: 10,
    color: '#32D67C',
  },
  description: {
    fontSize: 14,
    fontFamily: 'NotoSansThai_700Bold',
    textAlign: 'center',
    color: '#166534',
  },
  loading: {
    marginTop: 40,
  }
})