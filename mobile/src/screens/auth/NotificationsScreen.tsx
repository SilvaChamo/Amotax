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
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useApp } from "../../context/AppContext";
import {
  countUnreadAnnouncements,
  excerptNotificationBody,
  isAnnouncementUnread,
  sortAnnouncementsNewestFirst,
} from "../../lib/notifications";
import { CONTENT_MAX_WIDTH, SIDE_PADDING } from "../../theme/layout";
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
            <Text style={text.h2}>Notificações</Text>
            <Text style={styles.sub}>
              {unreadCount > 0
                ? `${unreadCount} não lida${unreadCount === 1 ? "" : "s"}`
                : "Todas as notificações foram lidas"}
            </Text>

            {list.length === 0 && (
              <Card>
                <Text style={text.body}>Ainda não há notificações.</Text>
              </Card>
            )}

            {list.map((a) => {
              const unread = data ? isAnnouncementUnread(data, a.id) : false;
              return (
                <Pressable key={a.id} onPress={() => openDetail(a)}>
                  <Card style={[styles.summaryCard, !unread && styles.summaryRead]}>
                    <View style={styles.meta}>
                      <Badge
                        label={unread ? "Não lida" : "Recebida"}
                        tone={unread ? "danger" : "navy"}
                      />
                      {a.sendSms ? <Badge label="SMS" tone="yellow" /> : null}
                      <Text style={text.caption}>{formatDateTime(a.publishedAt)}</Text>
                    </View>
                    <Text style={text.h3}>{a.title}</Text>
                    <Text style={styles.excerpt} numberOfLines={2}>
                      {excerptNotificationBody(a.body)}
                    </Text>
                    <Text style={styles.tapHint}>Toque para ler</Text>
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
                <Text style={text.h2}>{selected.title}</Text>
                <Text style={[text.caption, styles.modalDate]}>
                  {formatDateTime(selected.publishedAt)}
                </Text>
                <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                  <Text style={text.body}>{selected.body}</Text>
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
  },
  inner: {
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: "center",
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 16,
    gap: 12,
    alignItems: "stretch",
  },
  sub: {
    ...text.caption,
    textAlign: "left",
    alignSelf: "stretch",
    marginBottom: 4,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  summaryCard: {
    width: "100%",
  },
  summaryRead: {
    opacity: 0.92,
  },
  excerpt: {
    ...text.body,
    textAlign: "left",
    alignSelf: "stretch",
    color: colors.gray700,
  },
  tapHint: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.navyMid,
    marginTop: 8,
    textAlign: "left",
    alignSelf: "stretch",
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
    maxWidth: CONTENT_MAX_WIDTH,
    width: "100%",
    alignSelf: "center",
    maxHeight: "80%",
    gap: 12,
  },
  modalDate: {
    textAlign: "left",
    alignSelf: "stretch",
  },
  modalScroll: {
    maxHeight: 280,
  },
});
