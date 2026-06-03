import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Image, StyleSheet, Text } from "react-native";
import { MemberScreenLayout } from "../../components/MemberScreenLayout";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useApp } from "../../context/AppContext";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { text, fontFamily } from "../../theme/typography";
import { monthLabel } from "../../utils/date";
import type { RootStackParamList } from "../../navigation/types";

const statusMap = {
  pending: { label: "Em falta", tone: "danger" as const },
  review: { label: "Em análise", tone: "warning" as const },
  paid: { label: "Paga", tone: "success" as const },
  waived: { label: "Isenta", tone: "navy" as const },
};

export function DuesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, sessionMember, submitReceipt } = useApp();
  const dues = (data?.dues ?? [])
    .filter((d) => d.memberId === sessionMember?.id)
    .sort((a, b) => b.year - a.year || b.month - a.month);

  const upload = async (dueId: string) => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permissão", "Permita acesso à galeria para enviar o comprovativo.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      await submitReceipt(dueId, result.assets[0].uri);
      Alert.alert("Enviado", "Comprovativo em análise pela AMOTAX.");
    }
  };

  return (
    <MemberScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      title="Cotas mensais"
      subtitle="Valores simbólicos da associação"
    >
      <Card style={styles.info}>
        <Text style={text.body}>
          Piloto: transfira para a conta da AMOTAX e envie foto do comprovativo. Pagamento
          M-Pesa automático na fase seguinte.
        </Text>
        <Text style={styles.account}>Conta piloto: 84 000 0000 — AMOTAX</Text>
      </Card>
      {dues.map((d) => {
        const st = statusMap[d.status];
        return (
          <Card key={d.id}>
            <Text style={text.h3}>{monthLabel(d.year, d.month)}</Text>
            <Badge label={st.label} tone={st.tone} />
            <Text style={styles.amount}>{d.amountMzn} MT</Text>
            {d.receiptUri ? (
              <Image source={{ uri: d.receiptUri }} style={styles.thumb} />
            ) : null}
            {d.status === "pending" && sessionMember?.status === "active" && (
              <Button title="Enviar comprovativo" onPress={() => upload(d.id)} />
            )}
          </Card>
        );
      })}
      {dues.length === 0 && (
        <Text style={text.body}>Sem cotas registadas. Active a conta primeiro.</Text>
      )}
    </MemberScreenLayout>
  );
}

const styles = StyleSheet.create({
  info: { backgroundColor: colors.sky },
  account: {
    fontFamily: fontFamily.bold,
    color: colors.navy,
    fontSize: 15,
    textAlign: "center",
  },
  amount: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.yellowDark,
    textAlign: "center",
  },
  thumb: { width: "100%", maxWidth: 280, height: 120, borderRadius: RADIUS },
});
