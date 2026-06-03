import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text } from "react-native";
import { MemberScreenLayout } from "../../components/MemberScreenLayout";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { useApp } from "../../context/AppContext";
import { formatMemberLocation } from "../../data/mozambique-locations";
import { text } from "../../theme/typography";
import { formatPhoneDisplay } from "../../utils/phone";
import type { MainTabParamList } from "../../navigation/types";

export function ProfileScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const { sessionMember } = useApp();

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
    <MemberScreenLayout
      showBack
      onBack={() => navigation.navigate("Home")}
      title="O meu perfil"
      subtitle="Dados de membro AMOTAX"
    >
      <Card>
        <Text style={text.h3}>{sessionMember?.name}</Text>
        <Badge label={statusLabel} tone={statusTone as "success"} />
        <Row label="Nº membro" value={sessionMember?.memberNumber ?? "—"} />
        <Row label="Telemóvel" value={formatPhoneDisplay(sessionMember?.phone ?? "")} />
        <Row label="Província" value={sessionMember?.province ?? "—"} />
        <Row label="Distrito" value={sessionMember?.district ?? "—"} />
        <Row label="Município / local" value={sessionMember?.municipality ?? "—"} />
        <Row label="Posto administrativo" value={sessionMember?.adminPost ?? "—"} />
        <Row label="Praça" value={sessionMember?.praca ?? "—"} />
        <Row label="Zona" value={formatMemberLocation(sessionMember ?? {})} />
        <Row label="Matrícula" value={sessionMember?.licensePlate ?? "—"} />
        <Row label="SMS" value={sessionMember?.smsOptIn ? "Activado" : "Desactivado"} />
      </Card>
    </MemberScreenLayout>
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
