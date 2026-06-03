import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { AnnouncementsScreen } from "../screens/member/AnnouncementsScreen";
import { HomeScreen } from "../screens/member/HomeScreen";
import { MeetingsScreen } from "../screens/member/MeetingsScreen";
import { ProfileScreen } from "../screens/member/ProfileScreen";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/typography";
import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text
      style={{
        fontFamily: fontFamily.medium,
        fontSize: 11,
        color: focused ? colors.yellow : colors.gray500,
        textAlign: "center",
      }}
    >
      {label}
    </Text>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily: "Ubuntu-Medium",
          fontSize: 17,
          textAlign: "center",
        },
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.yellowDark,
        tabBarInactiveTintColor: colors.gray500,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray200,
          paddingBottom: 4,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel label="Início" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Announcements"
        component={AnnouncementsScreen}
        options={{
          title: "Avisos",
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel label="Avisos" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Meetings"
        component={MeetingsScreen}
        options={{
          title: "Reuniões",
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel label="Reuniões" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel label="Perfil" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
