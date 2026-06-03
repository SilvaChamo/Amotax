import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoHeader } from "./LogoHeader";
import { contentBlock } from "../theme/layout";

type Props = {
  leftAction?: ReactNode;
};

export function AuthWelcomeHeader({ leftAction }: Props) {
  return (
    <SafeAreaView edges={["top"]} style={styles.header}>
      <View style={styles.headerContent}>
        {leftAction ? <View style={styles.actionRow}>{leftAction}</View> : null}
        <View style={contentBlock}>
          <LogoHeader size="bar" onDark showTag={false} flat />
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
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 4,
  },
  actionRow: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  headerLine: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(220, 38, 38, 0.55)",
  },
});
