import { ImageBackground, ImageSourcePropType, StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../theme/colors";

const defaultImage = require("../../assets/imagem/Amotax.webp");

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  image?: ImageSourcePropType;
};

export function AppBackground({ children, style, image = defaultImage }: Props) {
  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <View style={[styles.overlay, style]}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
});
