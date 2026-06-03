import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { LOGO_BAR_HEIGHT, LOGO_BAR_WIDTH } from "../theme/layout";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/typography";

const logoImage = require("../../assets/imagem/Logotipo.png");

/** `bar` = cabeçalhos da app; `full` = ecrã inicial com legenda; `compact` = formulários */
type Size = "full" | "bar" | "compact" | "welcome" | "login" | "internal";

type Props = {
  size?: Size;
  onDark?: boolean;
  showTag?: boolean;
  flat?: boolean;
};

function isBarSize(size: Size) {
  return size === "bar" || size === "welcome" || size === "login" || size === "internal";
}

export function LogoHeader({
  size = "full",
  onDark = false,
  showTag = true,
  flat = false,
}: Props) {
  const bar = isBarSize(size);
  const compact = size === "compact";

  return (
    <View
      style={[
        styles.wrap,
        bar && styles.wrapBar,
        compact && styles.wrapCompact,
      ]}
    >
      <Image
        source={logoImage}
        style={[
          styles.logo,
          flat && styles.logoFlat,
          size === "full" && styles.logoFull,
          bar && styles.logoBar,
          compact && styles.logoCompact,
        ]}
        resizeMode="contain"
        accessibilityLabel="AMOTAX"
      />
      {size === "full" && showTag && (
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
  wrapBar: {
    marginBottom: 0,
    marginTop: 0,
  },
  wrapCompact: {
    marginBottom: 8,
    marginTop: 0,
  },
  logo: {
    width: "100%",
  },
  logoFlat: {
    borderWidth: 0,
    ...(Platform.OS === "web"
      ? ({
          outlineStyle: "none",
          boxShadow: "none",
        } as object)
      : {}),
  },
  logoFull: {
    maxWidth: 380,
    height: 168,
  },
  logoBar: {
    width: LOGO_BAR_WIDTH,
    maxWidth: LOGO_BAR_WIDTH,
    height: LOGO_BAR_HEIGHT,
  },
  logoCompact: {
    maxWidth: 300,
    height: 108,
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
