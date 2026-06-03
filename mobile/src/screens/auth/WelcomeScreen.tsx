import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackground } from "../../components/AppBackground";
import { LogoHeader } from "../../components/LogoHeader";
import { Button } from "../../components/ui/Button";
import { contentBlock } from "../../theme/layout";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <AppBackground>
      <SafeAreaView style={styles.root} edges={["top", "left", "right", "bottom"]}>
        <View style={styles.hero}>
          <View style={contentBlock}>
            <LogoHeader />
          </View>
        </View>
        <View style={[styles.actions, contentBlock]}>
          <Button title="Entrar" onPress={() => navigation.navigate("Login")} />
          <Button
            title="Inscrever-me como membro"
            variant="outline"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
    paddingBottom: 48,
    alignItems: "center",
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  actions: { gap: 12, width: "100%" },
});
