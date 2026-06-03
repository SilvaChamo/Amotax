import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoHeader } from "./LogoHeader";
import { useResponsiveLayoutContextSafe } from "../context/ResponsiveLayoutContext";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
};

export function PublicAppHeader({ left, right }: Props) {
  const { sidePadding, isLandscape } = useResponsiveLayoutContextSafe();

  return (
    <SafeAreaView
      edges={isLandscape ? ["top", "left", "right"] : ["top"]}
      style={styles.header}
    >
      <View style={[styles.outer, { paddingHorizontal: sidePadding }]}>
        <View style={styles.bar}>
          <View style={styles.side}>{left ?? <View style={styles.sideSpacer} />}</View>
          <View style={styles.logoWrap}>
            <LogoHeader size="bar" onDark showTag={false} />
          </View>
          <View style={[styles.side, styles.sideRight]}>
            {right ?? <View style={styles.sideSpacer} />}
          </View>
        </View>
      </View>
      <View style={styles.headerLine} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  outer: {
    paddingTop: 6,
    paddingBottom: 4,
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
  sideRight: {
    alignItems: "flex-end",
  },
  sideSpacer: {
    minWidth: 72,
    minHeight: 36,
  },
  logoWrap: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerLine: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(220, 38, 38, 0.55)",
  },
});
