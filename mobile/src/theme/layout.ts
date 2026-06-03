import { ViewStyle } from "react-native";

/** Largura máxima do conteúdo (útil no browser) */
export const CONTENT_MAX_WIDTH = 440;

export const contentBlock: ViewStyle = {
  width: "100%",
  maxWidth: CONTENT_MAX_WIDTH,
  alignSelf: "center",
  alignItems: "center",
  gap: 14,
};
