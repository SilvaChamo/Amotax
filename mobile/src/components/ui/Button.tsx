import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily } from "../../theme/typography";

type Variant = "primary" | "secondary" | "outline" | "danger";

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const variantBox: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: colors.yellow },
  secondary: { backgroundColor: colors.navy },
  outline: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 2,
    borderColor: colors.yellow,
  },
  danger: { backgroundColor: colors.danger },
};

const variantLabel: Record<Variant, { color: string }> = {
  primary: { color: colors.navy },
  secondary: { color: colors.white },
  outline: { color: colors.yellow },
  danger: { color: colors.white },
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variantBox[variant],
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? colors.yellow : colors.navy} />
      ) : (
        <Text style={[styles.label, variantLabel[variant]]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: RADIUS,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  pressed: { opacity: 0.88 },
  disabled: { opacity: 0.5 },
});
