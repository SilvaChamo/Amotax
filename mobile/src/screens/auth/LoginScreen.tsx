import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MemberTopBar } from "../../components/MemberTopBar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { DEMO_OTP } from "../../config/constants";
import { useApp } from "../../context/AppContext";
import { useResponsiveLayoutContextSafe } from "../../context/ResponsiveLayoutContext";
import { colors } from "../../theme/colors";
import { footerSurface } from "../../theme/layout";
import { fontFamily } from "../../theme/typography";
import { isValidMozPhone, normalizePhone } from "../../utils/phone";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { contentBlockStyle, sidePadding, isLandscape } =
    useResponsiveLayoutContextSafe();
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
    <View style={styles.page}>
      <MemberTopBar
        showBack
        onBack={() => navigation.navigate("Welcome")}
        showLogout={false}
      />
      <SafeAreaView
        style={styles.root}
        edges={isLandscape ? ["left", "right", "bottom"] : ["left", "right"]}
      >
        <View style={styles.center}>
          <View style={[contentBlockStyle, styles.phoneForm]}>
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
          <View style={[styles.footer, contentBlockStyle, { paddingHorizontal: sidePadding }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  root: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  phoneForm: {
    width: "100%",
    maxWidth: 300,
    alignSelf: "center",
    alignItems: "stretch",
  },
  phonePrompt: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.navy,
    textAlign: "center",
    width: "100%",
    marginBottom: 10,
  },
  hint: {
    fontSize: 13,
    color: colors.gray500,
    marginBottom: 8,
    textAlign: "center",
    width: "100%",
  },
  footerSafe: { ...footerSurface, alignItems: "center" },
  footer: {
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: "center",
  },
});
