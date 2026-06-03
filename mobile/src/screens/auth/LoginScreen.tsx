import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { LogoHeader } from "../../components/LogoHeader";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { DEMO_OTP } from "../../config/constants";
import { colors } from "../../theme/colors";
import { isValidMozPhone, normalizePhone } from "../../utils/phone";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const continueFlow = () => {
    if (!isValidMozPhone(phone)) {
      setError("Introduza um número válido (ex.: 84 123 4567)");
      return;
    }
    setError("");
    navigation.navigate("Otp", { phone: normalizePhone(phone), mode: "login" });
  };

  return (
    <Screen title="Entrar" subtitle="Use o número de telemóvel registado">
      <LogoHeader compact />
      <Input
        label="Telemóvel"
        placeholder="84 123 4567"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        error={error}
      />
      <Text style={styles.hint}>Piloto: código SMS = {DEMO_OTP}</Text>
      <Button title="Receber código" onPress={continueFlow} />
      <Button
        title="Ainda não tenho conta"
        variant="outline"
        onPress={() => navigation.navigate("Register")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 13,
    color: colors.gray500,
    marginBottom: 8,
    textAlign: "center",
    width: "100%",
  },
});
