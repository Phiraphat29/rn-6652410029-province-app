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
      <Image source={require('../assets/images/landmark.png')} style={styles.logo} />
      <Text style={styles.title}>Thai Province App</Text>
      <Text style={styles.description}>แอปแนะนำสถานที่ท่องเที่ยวในประเทศไทย</Text>
      <Text style={styles.description}>(ร้อยเอ็ด)</Text>
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  description: {
    fontSize: 16,
    fontFamily: 'NotoSansThai_700Bold',
    textAlign: 'center',
  },
  loading: {
    marginTop: 40,
  }
})