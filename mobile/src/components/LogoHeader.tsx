import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";
import { LOGO_BAR_HEIGHT, LOGO_BAR_WIDTH } from "../theme/layout";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/typography";

/** PNG com fundo transparente — sem caixa branca no cabeçalho */
const logoImage = require("../../assets/imagem/Logotipo.png");

type Size = "full" | "bar" | "compact" | "welcome" | "login" | "internal";

type Props = {
  size?: Size;
  onDark?: boolean;
  showTag?: boolean;
};

function isBarSize(size: Size) {
  return size === "bar" || size === "welcome" || size === "login" || size === "internal";
}

export function LogoHeader({
  size = "full",
  onDark = false,
  showTag = true,
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
          styles.logoTransparent,
          size === "full" && styles.logoFull,
          bar && styles.logoBar,
          compact && styles.logoCompact,
        ]}
        contentFit="contain"
        cachePolicy="memory-disk"
        transition={0}
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
    backgroundColor: "transparent",
  },
  wrapBar: {
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: "transparent",
  },
  wrapCompact: {
    marginBottom: 8,
    marginTop: 0,
    backgroundColor: "transparent",
  },
  logo: {
    width: "100%",
    backgroundColor: "transparent",
  },
  logoTransparent: {
    borderWidth: 0,
    ...(Platform.OS === "web"
      ? ({
          outlineStyle: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
        } as object)
      : { backgroundColor: "transparent" }),
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
