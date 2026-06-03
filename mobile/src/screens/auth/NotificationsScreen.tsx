import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { AnnouncementListPanel } from "../../components/AnnouncementListPanel";
import { MemberTopBar } from "../../components/MemberTopBar";
import { colors } from "../../theme/colors";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Notifications">;

export function NotificationsScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <MemberTopBar
        showBack
        onBack={() => navigation.goBack()}
        showLogout={false}
      />
      <AnnouncementListPanel
        title="Notificações"
        emptyMessage="Ainda não há notificações."
        allReadMessage="Todas as notificações foram lidas"
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
