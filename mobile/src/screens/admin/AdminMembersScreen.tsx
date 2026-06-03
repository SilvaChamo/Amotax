import { Alert, Text, View } from "react-native";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import { text } from "../../theme/typography";
import { formatPhoneDisplay } from "../../utils/phone";
import { monthLabel } from "../../utils/date";

export function AdminMembersScreen() {
  const { data, activate, reject, approveDuePayment } = useApp();

  return (
    <Screen title="Membros" subtitle="Aprovar inscrições e cotas">
      {data?.members.map((m) => {
        const zone = data.zones.find((z) => z.id === m.zoneId);
        const reviewDue = data.dues.find((d) => d.memberId === m.id && d.status === "review");
        return (
          <Card key={m.id}>
            <Text style={text.h3}>{m.name}</Text>
            <Text style={text.caption}>
              {formatPhoneDisplay(m.phone)}
              {"\n"}
              {zone?.name}
            </Text>
            <Badge
              label={
                m.status === "active" ? "Activo" : m.status === "pending" ? "Pendente" : "Rejeitado"
              }
              tone={m.status === "active" ? "success" : m.status === "pending" ? "warning" : "danger"}
            />
            {m.status === "pending" && (
              <View style={{ gap: 8, width: "100%" }}>
                <Button title="Activar" onPress={() => activate(m.id)} />
                <Button
                  title="Rejeitar"
                  variant="danger"
                  onPress={() =>
                    Alert.alert("Rejeitar", "Confirmar rejeição?", [
                      { text: "Cancelar" },
                      { text: "Rejeitar", onPress: () => reject(m.id) },
                    ])
                  }
                />
              </View>
            )}
            {reviewDue && (
              <View style={{ gap: 8, width: "100%" }}>
                <Text style={text.body}>
                  Comprovativo: {monthLabel(reviewDue.year, reviewDue.month)} — {reviewDue.amountMzn}{" "}
                  MT
                </Text>
                <Button
                  title="Aprovar pagamento"
                  variant="secondary"
                  onPress={() => approveDuePayment(reviewDue.id)}
                />
              </View>
            )}
          </Card>
        );
      })}
    </Screen>
  );
}
