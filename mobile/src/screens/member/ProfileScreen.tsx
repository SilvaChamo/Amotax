import { StyleSheet, Text } from "react-native";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import { text } from "../../theme/typography";
import { formatPhoneDisplay } from "../../utils/phone";

export function ProfileScreen() {
  const { data, sessionMember } = useApp();
  const zone = data?.zones.find((z) => z.id === sessionMember?.zoneId);

  const statusLabel =
    sessionMember?.status === "active"
      ? "Activo"
      : sessionMember?.status === "pending"
        ? "Pendente"
        : "Rejeitado";

  const statusTone =
    sessionMember?.status === "active"
      ? "success"
      : sessionMember?.status === "pending"
        ? "warning"
        : "danger";

  return (
    <Screen title="O meu perfil" subtitle="Dados de membro AMOTAX">
      <Card>
        <Text style={text.h3}>{sessionMember?.name}</Text>
        <Badge label={statusLabel} tone={statusTone as "success"} />
        <Row label="Nº membro" value={sessionMember?.memberNumber ?? "—"} />
        <Row label="Telemóvel" value={formatPhoneDisplay(sessionMember?.phone ?? "")} />
        <Row label="Zona" value={zone?.name ?? "—"} />
        <Row label="Matrícula" value={sessionMember?.licensePlate ?? "—"} />
        <Row label="SMS" value={sessionMember?.smsOptIn ? "Activado" : "Desactivado"} />
      </Card>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={text.body}>{value}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  label: { ...text.caption, marginTop: 4, width: "100%" },
});
