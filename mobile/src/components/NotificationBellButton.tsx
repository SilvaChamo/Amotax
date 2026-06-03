import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/typography";

type Props = {
  unreadCount: number;
  onPress: () => void;
  iconColor?: string;
};

export function NotificationBellButton({
  unreadCount,
  onPress,
  iconColor = colors.white,
}: Props) {
  const showBadge = unreadCount > 0;
  const label = unreadCount > 99 ? "99+" : String(unreadCount);

  return (
    <Pressable
      style={styles.btn}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        showBadge
          ? `${unreadCount} notificações não lidas`
          : "Notificações"
      }
    >
      <Ionicons name="notifications-outline" size={26} color={iconColor} />
      {showBadge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{label}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.white,
    lineHeight: 12,
  },
});
