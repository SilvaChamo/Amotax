import { useNavigation } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text } from "react-native";
import { MemberScreenLayout } from "../../components/MemberScreenLayout";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useApp } from "../../context/AppContext";
import { text, fontFamily } from "../../theme/typography";
import { colors } from "../../theme/colors";
import { monthLabel, currentYearMonth } from "../../utils/date";
import type { MainTabParamList, RootStackParamList } from "../../navigation/types";

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { data, sessionMember, isAdmin } = useApp();
  const { year, month } = currentYearMonth();

  const due = data?.dues.find(
    (d) =>
      d.memberId === sessionMember?.id && d.year === year && d.month === month,
  );
  const latestAnn = data?.announcements[0];
  const nextMeeting = data?.meetings[0];

  const dueLabel =
    due?.status === "paid"
      ? "Paga"
      : due?.status === "review"
        ? "Em análise"
        : "Em falta";

  const dueTone =
    due?.status === "paid" ? "success" : due?.status === "review" ? "warning" : "danger";

  return (
    <MemberScreenLayout>
      <Text style={styles.greeting}>
        Olá, {sessionMember?.name.split(" ")[0] ?? "Membro"}
      </Text>
      <Text style={styles.memberNum}>
        {sessionMember?.memberNumber ?? "Aguarda activação"}
      </Text>

      {sessionMember?.status === "pending" && (
        <Card style={styles.pending}>
          <Badge label="Inscrição pendente" tone="warning" />
          <Text style={text.body}>
            A direcção da AMOTAX irá activar a sua conta em breve. Pode consultar avisos
            enquanto aguarda.
          </Text>
        </Card>
      )}

      <Card>
        <Text style={text.h3}>Cota do mês</Text>
        <Text style={styles.amount}>{due?.amountMzn ?? data?.config.dueAmountMzn} MT</Text>
        <Badge label={dueLabel} tone={dueTone as "success"} />
        <Text style={text.caption}>{monthLabel(year, month)}</Text>
        {due?.status !== "paid" && sessionMember?.status === "active" && (
          <Button
            title="Pagar / enviar comprovativo"
            onPress={() => navigation.navigate("Dues")}
            style={{ marginTop: 4 }}
          />
        )}
      </Card>

      {latestAnn && (
        <Card>
          <Badge label="Último aviso" tone="yellow" />
          <Text style={text.h3}>{latestAnn.title}</Text>
          <Text style={text.body} numberOfLines={3}>
            {latestAnn.body}
          </Text>
          <Button
            title="Ver todos os avisos"
            variant="outline"
            onPress={() => navigation.navigate("Announcements")}
          />
        </Card>
      )}

      {nextMeeting && (
        <Card>
          <Badge label="Próxima reunião" tone="navy" />
          <Text style={text.h3}>{nextMeeting.title}</Text>
          <Text style={text.caption}>{nextMeeting.locationText}</Text>
          <Button
            title="Ver reuniões"
            variant="secondary"
            onPress={() => navigation.navigate("Meetings")}
          />
        </Card>
      )}

      <Button
        title="Cartão de membro"
        variant="outline"
        onPress={() => navigation.navigate("MemberCard")}
      />

      {isAdmin && (
        <Button
          title="Painel de administração"
          variant="secondary"
          onPress={() => navigation.navigate("Admin")}
        />
      )}
    </MemberScreenLayout>
  );
}

const styles = StyleSheet.create({
  greeting: {
    ...text.h2,
    marginBottom: 4,
  },
  memberNum: {
    ...text.caption,
    marginBottom: 12,
  },
  pending: { borderColor: colors.warning },
  amount: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    color: colors.yellowDark,
    textAlign: "center",
  },
});
