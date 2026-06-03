import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily } from "../../theme/typography";

type Tone = "yellow" | "navy" | "success" | "warning" | "danger";

const toneMap: Record<Tone, { bg: string; fg: string }> = {
  yellow: { bg: colors.yellowPale, fg: colors.yellowDark },
  navy: { bg: colors.sky, fg: colors.navy },
  success: { bg: "#DCFCE7", fg: colors.success },
  warning: { bg: "#FEF9C3", fg: colors.warning },
  danger: { bg: "#FEE2E2", fg: colors.danger },
};

export function Badge({ label, tone = "navy" }: { label: string; tone?: Tone }) {
  const t = toneMap[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      <Text style={[styles.text, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    textAlign: "center",
  },
});
