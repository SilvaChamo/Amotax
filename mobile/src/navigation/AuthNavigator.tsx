import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { OtpScreen } from "../screens/auth/OtpScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { WelcomeScreen } from "../screens/auth/WelcomeScreen";
import { colors } from "../theme/colors";
import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: colors.yellow,
        headerTitleStyle: { fontFamily: "Ubuntu-Medium" },
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: colors.gray100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Entrar" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Inscrição" }} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ title: "Verificação" }} />
    </Stack.Navigator>
  );
}
