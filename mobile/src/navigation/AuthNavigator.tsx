import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "../screens/auth/WelcomeScreen";
import { colors } from "../theme/colors";
import { authScreenOptions } from "./authScreenOptions";
import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...authScreenOptions,
        contentStyle: { backgroundColor: colors.gray100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        getComponent={() => require("../screens/auth/LoginScreen").LoginScreen}
      />
      <Stack.Screen
        name="Notifications"
        options={{ headerShown: false }}
        getComponent={() =>
          require("../screens/auth/NotificationsScreen").NotificationsScreen
        }
      />
      <Stack.Screen
        name="Register"
        options={{ headerShown: false }}
        getComponent={() => require("../screens/auth/RegisterScreen").RegisterScreen}
      />
      <Stack.Screen
        name="Otp"
        getComponent={() => require("../screens/auth/OtpScreen").OtpScreen}
      />
    </Stack.Navigator>
  );
}
