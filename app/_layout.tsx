import { NotoSansThai_400Regular, NotoSansThai_700Bold, useFonts } from "@expo-google-fonts/noto-sans-thai";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NotoSansThai_400Regular,
    NotoSansThai_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="home" options={{ headerStyle: { backgroundColor: '#0000ff' }, headerTitle: 'หน้าหลัก', headerTitleAlign: 'center', headerTintColor: '#FFC107', headerTitleStyle: { fontFamily: 'NotoSansThai_700Bold' } }} />

  </Stack>;
}
