import { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { contentBlock } from "../../theme/layout";
import { colors } from "../../theme/colors";
import { text } from "../../theme/typography";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  scroll?: boolean;
  headerRight?: ReactNode;
  centered?: boolean;
};

export function Screen({
  title,
  subtitle,
  children,
  scroll = true,
  headerRight,
  centered = true,
}: Props) {
  const inner = centered ? <View style={contentBlock}>{children}</View> : children;

  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.scroll, centered && styles.scrollCentered]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {inner}
    </ScrollView>
  ) : (
    <View style={[styles.scroll, centered && styles.scrollCentered]}>{inner}</View>
  );

  const hasHeader = Boolean(title || subtitle);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {hasHeader && (
        <View style={[styles.header, headerRight ? styles.headerWithAction : undefined]}>
          {headerRight ? (
            <>
              <View style={styles.headerCenterBlock}>
                {title ? <Text style={text.h2}>{title}</Text> : null}
                {subtitle ? <Text style={text.caption}>{subtitle}</Text> : null}
              </View>
              <View style={styles.headerAction}>{headerRight}</View>
            </>
          ) : (
            <View style={styles.headerText}>
              {title ? <Text style={text.h2}>{title}</Text> : null}
              {subtitle ? <Text style={text.caption}>{subtitle}</Text> : null}
            </View>
          )}
        </View>
      )}
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.gray100 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: "center",
  },
  headerWithAction: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 56,
  },
  headerCenterBlock: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  headerAction: {
    position: "absolute",
    right: 20,
    top: 8,
  },
  headerText: { gap: 4, width: "100%", alignItems: "center" },
  scroll: { padding: 20, paddingBottom: 40 },
  scrollCentered: { alignItems: "center" },
});
