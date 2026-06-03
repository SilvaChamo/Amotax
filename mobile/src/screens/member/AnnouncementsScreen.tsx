import { StyleSheet, Text, View } from "react-native";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import { text } from "../../theme/typography";
import { formatDateTime } from "../../utils/date";

export function AnnouncementsScreen() {
  const { data } = useApp();
  const list = data?.announcements ?? [];

  return (
    <Screen title="Avisos" subtitle="Comunicados da AMOTAX">
      {list.map((a) => (
        <Card key={a.id}>
          <View style={styles.meta}>
            {a.sendSms ? <Badge label="SMS" tone="yellow" /> : null}
            <Text style={text.caption}>{formatDateTime(a.publishedAt)}</Text>
          </View>
          <Text style={text.h3}>{a.title}</Text>
          <Text style={text.body}>{a.body}</Text>
        </Card>
      ))}
      {list.length === 0 && <Text style={text.body}>Sem avisos publicados.</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  meta: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
});
