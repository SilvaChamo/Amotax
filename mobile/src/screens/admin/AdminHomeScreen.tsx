import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import { text } from "../../theme/typography";
import type { AdminStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AdminStackParamList, "AdminHome">;

export function AdminHomeScreen({ navigation }: Props) {
  const { data } = useApp();
  const pending = data?.members.filter((m) => m.status === "pending").length ?? 0;
  const reviewDues = data?.dues.filter((d) => d.status === "review").length ?? 0;
  const active = data?.members.filter((m) => m.status === "active").length ?? 0;

  return (
    <Screen title="Administração" subtitle="Painel AMOTAX — piloto">
      <Card>
        <Text style={text.h3}>Resumo</Text>
        <Text style={text.body}>Membros activos: {active}</Text>
        <Text style={text.body}>Inscrições pendentes: {pending}</Text>
        <Text style={text.body}>Comprovativos a analisar: {reviewDues}</Text>
      </Card>
      <Button title="Gerir membros" onPress={() => navigation.navigate("AdminMembers")} />
      <Button
        title="Publicar aviso"
        variant="outline"
        onPress={() => navigation.navigate("AdminAnnouncement")}
      />
      <Button
        title="Criar reunião"
        variant="secondary"
        onPress={() => navigation.navigate("AdminMeeting")}
      />
      <Button
        title="Voltar ao início"
        variant="outline"
        onPress={() => navigation.getParent()?.goBack()}
      />
    </Screen>
  );
}
