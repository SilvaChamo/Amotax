import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "./src/context/AppContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

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

  if (!loaded) return null;

  return (
    <AppProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AppProvider>
  );
}
