import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { MemberTopBar } from "./MemberTopBar";
import { Screen } from "./ui/Screen";
import { colors } from "../theme/colors";

type Props = {
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  footer?: ReactNode;
  title?: string;
  subtitle?: string;
};

export function MemberScreenLayout({
  children,
  showBack,
  onBack,
  footer,
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.root}>
      <MemberTopBar showBack={showBack} onBack={onBack} />
      <Screen title={title} subtitle={subtitle} footer={footer} omitTopSafeArea>
        {children}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray100 },
});
