import { useState } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { fontFamily } from "../theme/typography";

type Props = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function TopBarButton({ label, onPress, style }: Props) {
  const [highlight, setHighlight] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      onHoverIn={() => setHighlight(true)}
      onHoverOut={() => setHighlight(false)}
      onPressIn={() => setHighlight(true)}
      onPressOut={() => setHighlight(false)}
      style={[styles.base, highlight && styles.hover, style]}
    >
      <Text style={[styles.label, highlight && styles.labelHover]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 204, 0, 0.45)",
    borderRadius: RADIUS,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  hover: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.yellow,
  },
  labelHover: {
    color: colors.navy,
  },
});
