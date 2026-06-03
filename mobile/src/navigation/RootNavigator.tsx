import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { useApp } from "../context/AppContext";
import { colors } from "../theme/colors";
import { AdminNavigator } from "./AdminNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { MainTabs } from "./MainTabs";
import { DuesScreen } from "../screens/member/DuesScreen";
import { MemberCardScreen } from "../screens/member/MemberCardScreen";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { loading, sessionMember } = useApp();

  if (loading) {
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!sessionMember ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Dues" component={DuesScreen} />
            <Stack.Screen name="MemberCard" component={MemberCardScreen} />
            <Stack.Screen name="Admin" component={AdminNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
