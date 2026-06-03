import { ViewStyle } from "react-native";

/** Largura máxima do conteúdo (útil no browser) */
export const CONTENT_MAX_WIDTH = 440;

/** Margens laterais alinhadas ao Screen e rodapé */
export const SIDE_PADDING = 20;

/** Logo no cabeçalho (fundo escuro ou azul) — mesmo tamanho em todas as páginas */
export const LOGO_BAR_WIDTH = 220;
export const LOGO_BAR_HEIGHT = 96;

export const contentBlock: ViewStyle = {
  width: "100%",
  maxWidth: CONTENT_MAX_WIDTH,
  alignSelf: "center",
  alignItems: "center",
  gap: 14,
};
