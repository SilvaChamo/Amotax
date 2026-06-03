import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminAnnouncementScreen } from "../screens/admin/AdminAnnouncementScreen";
import { AdminHomeScreen } from "../screens/admin/AdminHomeScreen";
import { AdminMeetingScreen } from "../screens/admin/AdminMeetingScreen";
import { AdminMembersScreen } from "../screens/admin/AdminMembersScreen";
import { colors } from "../theme/colors";
import type { AdminStackParamList } from "./types";

const Stack = createNativeStackNavigator<AdminStackParamList>();

export function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: "Ubuntu-Medium" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ title: "Admin AMOTAX" }}
      />
      <Stack.Screen
        name="AdminMembers"
        component={AdminMembersScreen}
        options={{ title: "Membros" }}
      />
      <Stack.Screen
        name="AdminAnnouncement"
        component={AdminAnnouncementScreen}
        options={{ title: "Novo aviso" }}
      />
      <Stack.Screen
        name="AdminMeeting"
        component={AdminMeetingScreen}
        options={{ title: "Nova reunião" }}
      />
    </Stack.Navigator>
  );
}
