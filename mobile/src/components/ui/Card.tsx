import { StyleSheet, View, ViewProps } from "react-native";
import { colors } from "../../theme/colors";

type Props = ViewProps & {
  centered?: boolean;
};

export function Card({ style, children, centered = true, ...rest }: Props) {
  return (
    <View style={[styles.card, centered && styles.centered, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
  },
  centered: {
    alignItems: "center",
    gap: 8,
  },
});
