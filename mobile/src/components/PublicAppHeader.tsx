import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoHeader } from "./LogoHeader";
import { CONTENT_MAX_WIDTH, SIDE_PADDING } from "../theme/layout";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
};

export function PublicAppHeader({ left, right }: Props) {
  return (
    <SafeAreaView edges={["top"]} style={styles.header}>
      <View style={styles.outer}>
        <View style={styles.bar}>
          <View style={styles.side}>{left ?? <View style={styles.sideSpacer} />}</View>
          <View style={styles.logoWrap}>
            <LogoHeader size="bar" onDark showTag={false} flat />
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
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 6,
    paddingBottom: 4,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: "center",
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
  },
  headerLine: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(220, 38, 38, 0.55)",
  },
});
