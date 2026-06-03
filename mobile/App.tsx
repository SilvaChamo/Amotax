import { useFonts } from "expo-font";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppContentFrame } from "./src/components/AppContentFrame";
import { AppProvider } from "./src/context/AppContext";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { colors } from "./src/theme/colors";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-Light": require("./assets/fonts/Ubuntu-Light.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    void Image.prefetch(require("./assets/imagem/Amotax.webp"));
    void Image.prefetch(require("./assets/imagem/Logotipo.png"));
  }, []);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.gray100,
        }}
      >
        <ActivityIndicator size="large" color={colors.yellow} />
      </View>
    );
  }

  return (
    <AppProvider>
      <StatusBar style="light" />
      <AppContentFrame>
        <RootNavigator />
      </AppContentFrame>
    </AppProvider>
  );
}
