import { ViewStyle } from "react-native";

/** Largura máxima única do conteúdo (mobile e tablet) */
export const APP_CONTENT_MAX_WIDTH = 480;

/** @deprecated usar APP_CONTENT_MAX_WIDTH */
export const CONTENT_MAX_WIDTH = APP_CONTENT_MAX_WIDTH;

/** Largura mínima do lado curto para considerar tablet */
export const TABLET_BREAKPOINT = 600;

/** Largura máxima da coluna em tablet horizontal */
export const TABLET_LANDSCAPE_MAX_WIDTH = 720;

/** Margens laterais dentro da coluna de conteúdo */
export const SIDE_PADDING = 20;

/** Logo no cabeçalho (fundo escuro ou azul) — mesmo tamanho em todas as páginas */
export const LOGO_BAR_WIDTH = 220;
export const LOGO_BAR_HEIGHT = 96;

/** Coluna principal — usar em formulários e blocos centrados */
export const contentBlock: ViewStyle = {
  width: "100%",
  maxWidth: APP_CONTENT_MAX_WIDTH,
  alignSelf: "center",
  alignItems: "stretch",
  gap: 14,
};

/** Raiz de página: centra a coluna em ecrãs largos (tablet) */
export const pageRoot: ViewStyle = {
  flex: 1,
  width: "100%",
  alignItems: "center",
};

/** Coluna de página (mesma largura em todas as rotas) */
export const pageColumn: ViewStyle = {
  flex: 1,
  width: "100%",
  maxWidth: APP_CONTENT_MAX_WIDTH,
};

/** Conteúdo com padding lateral padrão */
export const pagePadded: ViewStyle = {
  width: "100%",
  paddingHorizontal: SIDE_PADDING,
};
