import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { LogoHeader } from "../../components/LogoHeader";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import { colors } from "../../theme/colors";
import { fontFamily, text } from "../../theme/typography";
import { isValidMozPhone, normalizePhone } from "../../utils/phone";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { data, register } = useApp();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [zoneId, setZoneId] = useState(data?.zones[0]?.id ?? "");
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!name.trim()) {
      setError("Indique o seu nome completo");
      return;
    }
    if (!isValidMozPhone(phone)) {
      setError("Número de telemóvel inválido");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register({
        phone: normalizePhone(phone),
        name,
        zoneId,
        smsOptIn,
        licensePlate: plate,
      });
      navigation.navigate("Otp", { phone: normalizePhone(phone), mode: "register" });
    } catch {
      Alert.alert("Erro", "Não foi possível concluir o registo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Inscrição de membro" subtitle="Mototaxistas AMOTAX">
      <LogoHeader compact />
      <Input label="Nome completo" value={name} onChangeText={setName} placeholder="O seu nome" />
      <Input
        label="Telemóvel"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="84 123 4567"
      />
      <Input
        label="Matrícula da moto (opcional)"
        value={plate}
        onChangeText={setPlate}
        placeholder="ABC-1234"
      />
      <Text style={styles.zoneLabel}>Zona de operação</Text>
      <View style={styles.zones}>
        {data?.zones.map((z) => (
          <Pressable
            key={z.id}
            onPress={() => setZoneId(z.id)}
            style={[styles.zoneChip, zoneId === z.id && styles.zoneChipActive]}
          >
            <Text style={[styles.zoneText, zoneId === z.id && styles.zoneTextActive]}>
              {z.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.checkRow} onPress={() => setSmsOptIn(!smsOptIn)}>
        <View style={[styles.check, smsOptIn && styles.checkOn]} />
        <Text style={styles.checkLabel}>
          Aceito receber comunicações da AMOTAX por SMS
        </Text>
      </Pressable>
      {error ? <Text style={styles.err}>{error}</Text> : null}
      <Button title="Continuar" onPress={submit} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  zoneLabel: { ...text.label, marginBottom: 8, width: "100%" },
  zones: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
    justifyContent: "center",
    width: "100%",
  },
  zoneChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  zoneChipActive: {
    backgroundColor: colors.yellowPale,
    borderColor: colors.yellow,
  },
  zoneText: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.gray700, textAlign: "center" },
  zoneTextActive: { fontFamily: fontFamily.medium, color: colors.yellowDark },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.navyMid,
  },
  checkOn: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  checkLabel: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray700,
    textAlign: "center",
  },
  err: { color: colors.danger, marginBottom: 8, textAlign: "center", width: "100%" },
});
