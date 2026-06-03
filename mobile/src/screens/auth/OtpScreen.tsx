import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { DEMO_OTP } from "../../config/constants";
import { useApp } from "../../context/AppContext";
import { text } from "../../theme/typography";
import { formatPhoneDisplay } from "../../utils/phone";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Otp">;

export function OtpScreen({ route, navigation }: Props) {
  const { phone, mode } = route.params;
  const { login } = useApp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (code !== DEMO_OTP) {
      Alert.alert("Código incorrecto", `No piloto use ${DEMO_OTP}`);
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        const member = await login(phone);
        if (!member) {
          Alert.alert(
            "Conta não encontrada",
            "Inscreva-se primeiro ou verifique o número.",
            [{ text: "Inscrever", onPress: () => navigation.navigate("Register") }],
          );
          return;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Código SMS" subtitle={`Enviado para ${formatPhoneDisplay(phone)}`}>
      <Text style={[text.body, styles.note]}>
        Simulação de SMS no piloto.{"\n"}Código de teste: {DEMO_OTP}
      </Text>
      <Input
        label="Código de 6 dígitos"
        placeholder="123456"
        keyboardType="number-pad"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />
      <Button title="Confirmar" onPress={verify} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: { marginBottom: 4, width: "100%" },
});
