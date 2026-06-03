import { Platform, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily, text } from "../../theme/typography";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  align?: "center" | "left";
};

export function Input({ label, error, style, align = "center", ...rest }: Props) {
  const left = align === "left";
  return (
    <View style={styles.wrap}>
      {label ? (
        <Text style={[text.label, left && styles.labelLeft]}>{label}</Text>
      ) : null}
      <TextInput
        placeholderTextColor={colors.gray500}
        style={[
          styles.input,
          left && styles.inputLeft,
          error && styles.inputError,
          style,
        ]}
        {...rest}
      />
      {error ? <Text style={[styles.error, left && styles.errorLeft]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6, marginBottom: 14, width: "100%" },
  labelLeft: { textAlign: "left", alignSelf: "stretch" },
  input: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.navy,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: RADIUS,
    paddingHorizontal: 14,
    paddingVertical: 11,
    width: "100%",
    textAlign: "center",
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", boxSizing: "border-box" } as object)
      : {}),
  },
  inputLeft: { textAlign: "left" },
  inputError: { borderColor: colors.danger },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.danger,
    textAlign: "center",
  },
  errorLeft: { textAlign: "left", alignSelf: "stretch" },
});
