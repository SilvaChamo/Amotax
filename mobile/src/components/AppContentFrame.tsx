import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ResponsiveLayoutProvider } from "../context/ResponsiveLayoutContext";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { colors } from "../theme/colors";

type Props = {
  children: ReactNode;
};

/** App a largura total do dispositivo (header e conteúdo esticam com o ecrã). */
export function AppContentFrame({ children }: Props) {
  const layout = useResponsiveLayout();

  return (
    <ResponsiveLayoutProvider value={layout}>
      <View style={styles.outer}>
        <View style={styles.column}>{children}</View>
      </View>
    </ResponsiveLayoutProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray100,
  },
  column: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray100,
  },
});
