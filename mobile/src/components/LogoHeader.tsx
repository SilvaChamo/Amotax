import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/typography";

type Props = { compact?: boolean };

export function LogoHeader({ compact }: Props) {
  return (
    <View style={[styles.wrap, compact && styles.compact]}>
      <View style={[styles.icon, compact ? styles.iconCompact : styles.iconFull]}>
        <Text style={[styles.iconText, compact && styles.iconTextCompact]}>M</Text>
      </View>
      <Text style={[styles.brand, compact && styles.brandCompact]}>AMOTAX</Text>
      {!compact && (
        <Text style={styles.tag}>Associação Moçambicana de Moto Tax</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginBottom: 28,
    width: "100%",
  },
  compact: { marginBottom: 16 },
  icon: {
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconFull: {
    width: 72,
    height: 72,
    borderRadius: 18,
  },
  iconCompact: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  iconText: {
    fontFamily: fontFamily.bold,
    fontSize: 36,
    color: colors.navy,
  },
  iconTextCompact: { fontSize: 24 },
  brand: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.yellow,
    letterSpacing: 2,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  brandCompact: { fontSize: 22 },
  tag: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 16,
    lineHeight: 20,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
