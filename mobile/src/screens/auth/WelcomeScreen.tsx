import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackground } from "../../components/AppBackground";
import { NotificationBellButton } from "../../components/NotificationBellButton";
import { PublicAppHeader } from "../../components/PublicAppHeader";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { useResponsiveLayoutContextSafe } from "../../context/ResponsiveLayoutContext";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily } from "../../theme/typography";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

function unreadBubbleMessage(count: number): string {
  if (count === 1) return "Tens 1 notificação não lida";
  return `Tens ${count} notificações não lidas`;
}

export function WelcomeScreen({ navigation }: Props) {
  const { enterAsGuest, unreadNotificationCount } = useApp();
  const { contentBlockStyle, sidePadding, isLandscape } =
    useResponsiveLayoutContextSafe();
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
      <SafeAreaView
        style={styles.root}
        edges={isLandscape ? ["top", "left", "right", "bottom"] : ["left", "right"]}
      >
        <PublicAppHeader />

        <View style={styles.content}>
          <View style={[styles.contentInner, { paddingHorizontal: sidePadding }]}>
            <View style={styles.notifyWrap}>
              {unreadNotificationCount > 0 ? (
                <Pressable
                  style={styles.speechBubble}
                  onPress={() => navigation.navigate("Notifications")}
                  accessibilityRole="button"
                  accessibilityLabel={unreadBubbleMessage(unreadNotificationCount)}
                >
                  <Text style={styles.speechText}>
                    {unreadBubbleMessage(unreadNotificationCount)}
                  </Text>
                  <View style={styles.speechTail} />
                </Pressable>
              ) : null}
              <NotificationBellButton
                unreadCount={unreadNotificationCount}
                onPress={() => navigation.navigate("Notifications")}
              />
            </View>
          </View>
          <View style={styles.spacer} />
        </View>

        <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
          <View
            style={[
              styles.footer,
              contentBlockStyle,
              { paddingHorizontal: sidePadding },
            ]}
          >
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
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  contentInner: {
    width: "100%",
    alignSelf: "stretch",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  notifyWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    maxWidth: "100%",
  },
  speechBubble: {
    position: "relative",
    backgroundColor: colors.white,
    borderRadius: RADIUS,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: 220,
    marginRight: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  speechText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.navy,
    textAlign: "left",
  },
  speechTail: {
    position: "absolute",
    right: -7,
    top: "50%",
    marginTop: -7,
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: colors.white,
  },
  spacer: {
    flex: 1,
  },
  footerSafe: {
    width: "100%",
  },
  footer: {
    gap: 12,
    width: "100%",
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: "center",
  },
});
