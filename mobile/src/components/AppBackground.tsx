import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../theme/colors";

const defaultImage = require("../../assets/imagem/Amotax.webp");

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  image?: ImageSourcePropType;
};

export function AppBackground({ children, style, image = defaultImage }: Props) {
  return (
    <View style={styles.wrap}>
      <Image
        source={image}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={0}
        priority="high"
      />
      <View style={[styles.overlay, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
});
