import { useState } from "react";
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
  /** Hover com fundo amarelo (ex.: botão Cartão de membro) */
  hoverYellow?: boolean;
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
  hoverYellow = false,
}: Props) {
  const [highlight, setHighlight] = useState(false);
  const active = highlight && hoverYellow && !disabled && !loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      onHoverIn={() => setHighlight(true)}
      onHoverOut={() => setHighlight(false)}
      onPressIn={() => setHighlight(true)}
      onPressOut={() => setHighlight(false)}
      style={[
        styles.base,
        variantBox[variant],
        active && styles.hoverYellow,
        (disabled || loading) && styles.disabled,
        !active && highlight && !hoverYellow && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={active || variant === "primary" ? colors.navy : colors.yellow}
        />
      ) : (
        <Text
          style={[
            styles.label,
            { color: variantLabel[variant].color },
            active && styles.labelHoverYellow,
          ]}
        >
          {title}
        </Text>
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
    alignSelf: "stretch",
  },
  hoverYellow: {
    backgroundColor: colors.yellow,
    borderWidth: 0,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  labelHoverYellow: {
    color: colors.navy,
  },
  pressed: { opacity: 0.88 },
  disabled: { opacity: 0.5 },
});
