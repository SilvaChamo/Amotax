import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoHeader } from "./LogoHeader";
import { useResponsiveLayoutContextSafe } from "../context/ResponsiveLayoutContext";

type Props = {
  leftAction?: ReactNode;
};

export function AuthWelcomeHeader({ leftAction }: Props) {
  const { contentBlockStyle, sidePadding, isLandscape } =
    useResponsiveLayoutContextSafe();

  return (
    <SafeAreaView
      edges={isLandscape ? ["top", "left", "right"] : ["top"]}
      style={styles.header}
    >
      <View style={[styles.headerContent, { paddingHorizontal: sidePadding }]}>
        {leftAction ? <View style={styles.actionRow}>{leftAction}</View> : null}
        <View style={contentBlockStyle}>
          <LogoHeader size="bar" onDark showTag={false} />
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
  headerContent: {
    width: "100%",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 4,
  },
  actionRow: {
    width: "100%",
    alignSelf: "stretch",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  headerLine: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(220, 38, 38, 0.55)",
  },
});
