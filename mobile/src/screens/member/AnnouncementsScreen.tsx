import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { AnnouncementListPanel } from "../../components/AnnouncementListPanel";
import { MemberTopBar } from "../../components/MemberTopBar";
import { colors } from "../../theme/colors";
import type { MainTabParamList } from "../../navigation/types";

export function AnnouncementsScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <View style={styles.root}>
      <MemberTopBar showBack onBack={() => navigation.navigate("Home")} />
      <AnnouncementListPanel
        title="Avisos"
        emptyMessage="Ainda não há avisos."
        allReadMessage="Todos os avisos foram lidos"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
});
