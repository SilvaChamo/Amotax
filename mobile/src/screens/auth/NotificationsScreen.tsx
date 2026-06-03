import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MemberTopBar } from "../../components/MemberTopBar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useApp } from "../../context/AppContext";
import {
  countUnreadAnnouncements,
  deliveryLabel,
  getAnnouncementReadAt,
  isAnnouncementUnread,
  sortAnnouncementsNewestFirst,
} from "../../lib/notifications";
import { SIDE_PADDING } from "../../theme/layout";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily, text } from "../../theme/typography";
import { formatDateTime } from "../../utils/date";
import type { Announcement } from "../../types";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Notifications">;

export function NotificationsScreen({ navigation }: Props) {
  const { data, markAnnouncementRead } = useApp();
  const [selected, setSelected] = useState<Announcement | null>(null);

  const list = data ? sortAnnouncementsNewestFirst(data.announcements) : [];
  const unreadCount = data ? countUnreadAnnouncements(data) : 0;

  const openDetail = (item: Announcement) => {
    setSelected(item);
  };

  const closeDetail = () => {
    if (selected && data && isAnnouncementUnread(data, selected.id)) {
      void markAnnouncementRead(selected.id);
    }
    setSelected(null);
  };

  return (
    <View style={styles.root}>
      <MemberTopBar
        showBack
        onBack={() => navigation.goBack()}
        showLogout={false}
      />
      <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={text.h2}>Notificações</Text>
              <Text style={styles.sub}>
                {unreadCount > 0
                  ? `${unreadCount} não lida${unreadCount === 1 ? "" : "s"}`
                  : "Todas as notificações foram lidas"}
              </Text>
            </View>

            {list.length === 0 && (
              <View style={styles.cardPress}>
                <Card centered={false} style={styles.rowCard}>
                  <Text style={text.body}>Ainda não há notificações.</Text>
                </Card>
              </View>
            )}

            {list.map((a) => {
              const unread = data ? isAnnouncementUnread(data, a.id) : false;
              const readAt = data ? getAnnouncementReadAt(data, a.id) : undefined;
              const dateLabel = unread
                ? formatDateTime(a.publishedAt)
                : readAt
                  ? formatDateTime(readAt)
                  : formatDateTime(a.publishedAt);
              return (
                <Pressable
                  key={a.id}
                  style={styles.cardPress}
                  onPress={() => openDetail(a)}
                >
                  <Card
                    centered={false}
                    style={[styles.rowCard, !unread && styles.rowCardRead]}
                  >
                    <Text style={styles.subject} numberOfLines={2}>
                      {a.title}
                    </Text>
                    <View style={styles.metaRow}>
                      {unread ? <View style={styles.unreadDot} /> : null}
                      <Text style={styles.metaText}>{dateLabel}</Text>
                      <Text style={styles.metaSep}>·</Text>
                      <Text style={styles.metaEnvio}>{deliveryLabel(a.sendSms)}</Text>
                    </View>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={selected !== null}
        transparent
        animationType="fade"
        onRequestClose={closeDetail}
      >
        <Pressable style={styles.modalOverlay} onPress={closeDetail}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            {selected ? (
              <>
                <Text style={styles.modalTitle}>{selected.title}</Text>
                <Text style={styles.modalMeta}>
                  {formatDateTime(selected.publishedAt)} · {deliveryLabel(selected.sendSms)}
                </Text>
                <ScrollView
                  style={styles.modalScroll}
                  contentContainerStyle={styles.modalScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.modalBody}>{selected.body}</Text>
                </ScrollView>
                <Button title="Fechar" onPress={closeDetail} />
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 24,
    width: "100%",
  },
  inner: {
    width: "100%",
    paddingTop: 16,
    gap: 10,
  },
  header: {
    width: "100%",
    paddingHorizontal: SIDE_PADDING,
    gap: 4,
    marginBottom: 4,
  },
  sub: {
    ...text.caption,
    textAlign: "left",
  },
  cardPress: {
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: SIDE_PADDING,
  },
  rowCard: {
    width: "100%",
    alignSelf: "stretch",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 6,
  },
  rowCardRead: {
    opacity: 0.94,
  },
  subject: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.navy,
    lineHeight: 22,
    textAlign: "left",
    alignSelf: "stretch",
    width: "100%",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    gap: 6,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.danger,
    marginRight: 2,
  },
  metaText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.gray700,
    textAlign: "left",
  },
  metaSep: {
    fontSize: 13,
    color: colors.gray500,
    textAlign: "left",
  },
  metaEnvio: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.navyMid,
    textAlign: "left",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    padding: SIDE_PADDING,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: RADIUS,
    padding: 20,
    width: "100%",
    alignItems: "flex-start",
    maxHeight: "80%",
    gap: 12,
  },
  modalTitle: {
    ...text.h2,
    textAlign: "left",
    alignSelf: "stretch",
    width: "100%",
  },
  modalMeta: {
    ...text.caption,
    textAlign: "left",
  },
  modalScroll: {
    maxHeight: 280,
  },
  modalScrollContent: {
    alignItems: "flex-start",
  },
  modalBody: {
    ...text.body,
    textAlign: "left",
  },
});
