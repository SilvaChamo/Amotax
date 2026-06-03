import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/typography";

const logoImage = require("../../assets/imagem/Logotipo.png");

type Size = "full" | "compact" | "login" | "internal";

type Props = { size?: Size; onDark?: boolean };

export function LogoHeader({ size = "full", onDark = false }: Props) {
  const compact = size === "compact";
  const login = size === "login";
  const internal = size === "internal";

  return (
    <View
      style={[
        styles.wrap,
        compact && styles.wrapCompact,
        login && styles.wrapLogin,
        internal && styles.wrapInternal,
      ]}
    >
      <Image
        source={logoImage}
        style={[
          styles.logo,
          size === "full" && styles.logoFull,
          compact && styles.logoCompact,
          login && styles.logoLogin,
          internal && styles.logoInternal,
        ]}
        resizeMode="contain"
        accessibilityLabel="AMOTAX"
      />
      {size === "full" && (
        <Text style={[styles.tag, onDark && styles.tagOnDark]}>
          Associação Moçambicana de Moto Tax
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  wrapCompact: {
    marginBottom: 8,
    marginTop: 0,
  },
  wrapInternal: {
    marginBottom: 0,
    marginTop: 0,
  },
  wrapLogin: {
    marginBottom: 16,
    marginTop: 0,
  },
  logo: {
    width: "100%",
  },
  logoFull: {
    maxWidth: 380,
    height: 168,
  },
  logoCompact: {
    maxWidth: 300,
    height: 108,
  },
  logoInternal: {
    maxWidth: 260,
    height: 72,
  },
  logoLogin: {
    maxWidth: 300,
    height: 118,
  },
  tag: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.navyMid,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  tagOnDark: {
    color: colors.white,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
