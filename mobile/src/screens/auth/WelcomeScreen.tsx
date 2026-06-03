import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackground } from "../../components/AppBackground";
import { NotificationBellButton } from "../../components/NotificationBellButton";
import { PublicAppHeader } from "../../components/PublicAppHeader";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { CONTENT_MAX_WIDTH, contentBlock, SIDE_PADDING } from "../../theme/layout";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

export function WelcomeScreen({ navigation }: Props) {
  const { enterAsGuest, unreadNotificationCount } = useApp();
  const [loading, setLoading] = useState(false);

  const explore = async () => {
    setLoading(true);
    try {
      await enterAsGuest();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBackground>
      <SafeAreaView style={styles.root} edges={["left", "right"]}>
        <PublicAppHeader />

        <View style={styles.content}>
          <View style={styles.contentInner}>
            <NotificationBellButton
              unreadCount={unreadNotificationCount}
              onPress={() => navigation.navigate("Notifications")}
            />
          </View>
          <View style={styles.spacer} />
        </View>

        <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
          <View style={[styles.footer, contentBlock]}>
            <Button
              title="Explorar sem login"
              onPress={explore}
              loading={loading}
            />
            <Button title="Entrar" onPress={() => navigation.navigate("Login")} />
            <Button
              title="Inscrever-me como membro"
              variant="outline"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  contentInner: {
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: "center",
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  spacer: {
    flex: 1,
  },
  footerSafe: {
    width: "100%",
    alignItems: "center",
  },
  footer: {
    gap: 12,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: "center",
  },
});
