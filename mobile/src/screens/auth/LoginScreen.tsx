import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackground } from "../../components/AppBackground";
import { PublicAppHeader } from "../../components/PublicAppHeader";
import { TopBarButton } from "../../components/TopBarButton";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { DEMO_OTP } from "../../config/constants";
import { useApp } from "../../context/AppContext";
import { contentBlock } from "../../theme/layout";
import { colors } from "../../theme/colors";
import { fontFamily } from "../../theme/typography";
import { isValidMozPhone, normalizePhone } from "../../utils/phone";
import type { AuthStackParamList } from "../../navigation/types";

const loginBg = require("../../../assets/imagem/Bg2.jpeg");

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { enterAsGuest } = useApp();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [guestLoading, setGuestLoading] = useState(false);

  const continueFlow = () => {
    if (!isValidMozPhone(phone)) {
      setError("Introduza um número válido (ex.: 84 123 4567)");
      return;
    }
    setError("");
    navigation.navigate("Otp", { phone: normalizePhone(phone), mode: "login" });
  };

  const skipLogin = async () => {
    setGuestLoading(true);
    try {
      await enterAsGuest();
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <AppBackground image={loginBg}>
      <SafeAreaView style={styles.root} edges={["left", "right"]}>
        <PublicAppHeader
          left={
            <TopBarButton label="Voltar" onPress={() => navigation.navigate("Welcome")} />
          }
        />

        <View style={styles.center}>
          <View style={contentBlock}>
            <Text style={styles.phonePrompt}>Digite seu numero de telefone</Text>
            <Input
              placeholder="84 123 4567"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              error={error}
            />
            <Text style={styles.hint}>Piloto: código SMS = {DEMO_OTP}</Text>
          </View>
        </View>

        <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
          <View style={[styles.footer, contentBlock]}>
            <Button title="Receber código" onPress={continueFlow} />
            <Button
              title="Ainda não tenho conta"
              variant="outline"
              onPress={() => navigation.navigate("Register")}
            />
            <Button
              title="Entrar sem login (explorar)"
              variant="secondary"
              onPress={skipLogin}
              loading={guestLoading}
            />
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  phonePrompt: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    width: "100%",
    marginBottom: 10,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  hint: {
    fontSize: 13,
    color: colors.yellowLight,
    marginBottom: 8,
    textAlign: "center",
    width: "100%",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footerSafe: { width: "100%", alignItems: "center" },
  footer: {
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: "center",
  },
});
