import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../context/AppContext";
import { useResponsiveLayoutContextSafe } from "../context/ResponsiveLayoutContext";
import { colors } from "../theme/colors";
import { LogoHeader } from "./LogoHeader";
import { TopBarButton } from "./TopBarButton";

type Props = {
  showBack?: boolean;
  onBack?: () => void;
  /** Mostrar botão Sair (área membro). Desactivar em ecrãs de auth com fundo claro. */
  showLogout?: boolean;
};

export function MemberTopBar({ showBack, onBack, showLogout = true }: Props) {
  const { logout } = useApp();
  const { sidePadding, isLandscape } = useResponsiveLayoutContextSafe();

  return (
    <SafeAreaView
      edges={isLandscape ? ["top", "left", "right"] : ["top"]}
      style={styles.safe}
    >
      <View style={[styles.outer, { paddingHorizontal: sidePadding }]}>
        <View style={styles.bar}>
          <View style={styles.side}>
            {showBack && onBack ? (
              <TopBarButton label="Voltar" onPress={onBack} />
            ) : (
              <View style={styles.sideSpacer} />
            )}
          </View>
          <View style={styles.logoWrap}>
            <LogoHeader size="bar" />
          </View>
          <View style={[styles.side, styles.sideRight]}>
            {showLogout ? (
              <TopBarButton label="Sair" onPress={() => logout()} />
            ) : (
              <View style={styles.sideSpacer} />
            )}
          </View>
        </View>
      </View>
      <View style={styles.yellowLine} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.navy,
  },
  yellowLine: {
    height: 5,
    backgroundColor: colors.yellow,
    width: "100%",
  },
  outer: {
    paddingBottom: 10,
    paddingTop: 8,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "stretch",
    minHeight: 100,
  },
  side: {
    minWidth: 80,
    justifyContent: "center",
  },
  sideSpacer: {
    minWidth: 72,
    minHeight: 36,
  },
  sideRight: {
    alignItems: "flex-end",
  },
  logoWrap: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
