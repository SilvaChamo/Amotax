import { Picker } from "@react-native-picker/picker";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily, text } from "../../theme/typography";

export type SelectOption = { value: string; label: string };

type Props = {
  label: string;
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  enabled?: boolean;
};

export function Select({
  label,
  value,
  options,
  onValueChange,
  placeholder = "Seleccione...",
  enabled = true,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.box, !enabled && styles.boxDisabled]}>
        <Picker
          enabled={enabled}
          selectedValue={value || ""}
          onValueChange={(v) => {
            if (v !== "") onValueChange(String(v));
          }}
          style={styles.picker}
          dropdownIconColor={colors.navy}
        >
          <Picker.Item label={placeholder} value="" color={colors.gray500} />
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    marginBottom: 14,
    gap: 6,
  },
  label: {
    ...text.label,
    textAlign: "left",
    alignSelf: "stretch",
  },
  box: {
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: RADIUS,
    overflow: "hidden",
    justifyContent: "center",
    minHeight: 48,
  },
  boxDisabled: {
    backgroundColor: colors.gray100,
    opacity: 0.85,
  },
  picker: {
    width: "100%",
    color: colors.navy,
    ...(Platform.OS === "web"
      ? ({
          minHeight: 44,
          fontFamily: fontFamily.regular,
          fontSize: 15,
          paddingHorizontal: 10,
          borderRadius: RADIUS,
          borderWidth: 0,
          borderStyle: "none",
          outlineStyle: "none",
          backgroundColor: "transparent",
          boxSizing: "border-box",
        } as object)
      : {}),
  },
});
