import { useMemo } from "react";
import { useWindowDimensions, ViewStyle } from "react-native";
import { SIDE_PADDING, TABLET_BREAKPOINT } from "../theme/layout";

export type ResponsiveLayout = {
  width: number;
  height: number;
  isLandscape: boolean;
  isTablet: boolean;
  isPhone: boolean;
  /** Largura útil = largura total do dispositivo */
  contentMaxWidth: number;
  sidePadding: number;
  contentBlockStyle: ViewStyle;
};

export function useResponsiveLayout(): ResponsiveLayout {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isLandscape = width > height;
    const shortSide = Math.min(width, height);
    const isTablet = shortSide >= TABLET_BREAKPOINT;
    const isPhone = !isTablet;
    const sidePadding = isTablet ? 24 : SIDE_PADDING;

    const contentBlockStyle: ViewStyle = {
      width: "100%",
      alignSelf: "stretch",
      alignItems: "stretch",
      gap: 14,
    };

    return {
      width,
      height,
      isLandscape,
      isTablet,
      isPhone,
      contentMaxWidth: width,
      sidePadding,
      contentBlockStyle,
    };
  }, [width, height]);
}
