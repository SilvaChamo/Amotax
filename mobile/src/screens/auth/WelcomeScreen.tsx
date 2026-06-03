import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackground } from "../../components/AppBackground";
import { LogoHeader } from "../../components/LogoHeader";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { contentBlock } from "../../theme/layout";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

export function WelcomeScreen({ navigation }: Props) {
  const { enterAsGuest } = useApp();
  const [loading, setLoading] = useState(false);

  const explore = async () => {
    setLoading(true);
    try {
      await enterAsGuest();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBackground>
      <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
        <View style={styles.hero}>
          <View style={contentBlock}>
            <LogoHeader onDark />
          </View>
        </View>
        <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
          <View style={[styles.footer, contentBlock]}>
            <Button
              title="Explorar sem login"
              onPress={explore}
              loading={loading}
            />
            <Button title="Entrar" onPress={() => navigation.navigate("Login")} />
            <Button
              title="Inscrever-me como membro"
              variant="outline"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  footerSafe: {
    width: "100%",
    alignItems: "center",
  },
  footer: {
    gap: 12,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: "center",
  },
});
