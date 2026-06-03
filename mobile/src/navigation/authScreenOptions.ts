import { colors } from "../theme/colors";

/** Barra superior azul (cor do logo) com seta para voltar */
export const authScreenOptions = {
  headerStyle: { backgroundColor: colors.navy },
  headerTintColor: colors.yellow,
  headerTitleStyle: {
    fontFamily: "Ubuntu-Medium",
    color: colors.white,
  },
  headerTitleAlign: "center" as const,
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  title: "",
};
