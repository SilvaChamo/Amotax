import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../theme/colors";
import { fontFamily, text } from "../../theme/typography";

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={text.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.gray500}
        style={[styles.input, error && styles.inputError, style]}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6, marginBottom: 14, width: "100%", alignItems: "center" },
  input: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.navy,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "100%",
    textAlign: "center",
  },
  inputError: { borderColor: colors.danger },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.danger,
    textAlign: "center",
  },
});
