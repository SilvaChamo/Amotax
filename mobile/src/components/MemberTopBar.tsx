import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../context/AppContext";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/typography";
import { LogoHeader } from "./LogoHeader";

type Props = {
  showBack?: boolean;
  onBack?: () => void;
};

export function MemberTopBar({ showBack, onBack }: Props) {
  const { logout } = useApp();

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.bar}>
        <View style={styles.side}>
          {showBack && onBack ? (
            <Pressable onPress={onBack} hitSlop={8}>
              <Text style={styles.back}>← Voltar</Text>
            </Pressable>
          ) : null}
        </View>
        <View style={styles.logoWrap}>
          <LogoHeader size="internal" />
        </View>
        <View style={[styles.side, styles.sideRight]}>
          <Pressable onPress={() => logout()} hitSlop={8}>
            <Text style={styles.sair}>Sair</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: colors.navy },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 10,
    minHeight: 56,
  },
  side: { width: 88, justifyContent: "center" },
  sideRight: { alignItems: "flex-end" },
  logoWrap: { flex: 1, alignItems: "center" },
  back: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.yellow,
  },
  sair: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.yellow,
  },
});
