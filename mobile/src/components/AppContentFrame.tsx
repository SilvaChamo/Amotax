import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ResponsiveLayoutProvider } from "../context/ResponsiveLayoutContext";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { colors } from "../theme/colors";

type Props = {
  children: ReactNode;
};

/**
 * Coluna de conteúdo adaptável (telefone, tablet, rotação).
 * Em ecrãs largos centra a app com margens laterais.
 */
export function AppContentFrame({ children }: Props) {
  const layout = useResponsiveLayout();
  const { contentMaxWidth, isTablet, isLandscape } = layout;
  const wideShell = isTablet || isLandscape;

  return (
    <ResponsiveLayoutProvider value={layout}>
      <View style={[styles.outer, wideShell && styles.outerWide]}>
        <View style={[styles.column, { maxWidth: contentMaxWidth }]}>
          {children}
        </View>
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
  outerWide: {
    alignItems: "center",
    backgroundColor: colors.navy,
  },
  column: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray100,
    overflow: "hidden",
  },
});
