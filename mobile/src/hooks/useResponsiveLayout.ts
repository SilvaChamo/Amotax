import { useMemo } from "react";
import { useWindowDimensions, ViewStyle } from "react-native";
import {
  APP_CONTENT_MAX_WIDTH,
  SIDE_PADDING,
  TABLET_BREAKPOINT,
  TABLET_LANDSCAPE_MAX_WIDTH,
} from "../theme/layout";

export type ResponsiveLayout = {
  width: number;
  height: number;
  isLandscape: boolean;
  isTablet: boolean;
  isPhone: boolean;
  contentMaxWidth: number;
  sidePadding: number;
  contentBlockStyle: ViewStyle;
};

export function useResponsiveLayout(): ResponsiveLayout {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isLandscape = width > height;
    const shortSide = Math.min(width, height);
    const longSide = Math.max(width, height);
    const isTablet = shortSide >= TABLET_BREAKPOINT;
    const isPhone = !isTablet;

    let contentMaxWidth = APP_CONTENT_MAX_WIDTH;

    if (isTablet) {
      contentMaxWidth = isLandscape
        ? Math.min(Math.round(longSide * 0.88), TABLET_LANDSCAPE_MAX_WIDTH)
        : Math.min(Math.round(shortSide * 0.94), APP_CONTENT_MAX_WIDTH + 40);
    } else if (isLandscape) {
      contentMaxWidth = Math.min(Math.round(longSide * 0.94), 520);
    } else {
      contentMaxWidth = Math.min(width, APP_CONTENT_MAX_WIDTH);
    }

    const sidePadding = isTablet ? 24 : SIDE_PADDING;

    const contentBlockStyle: ViewStyle = {
      width: "100%",
      maxWidth: contentMaxWidth,
      alignSelf: "center",
      alignItems: "stretch",
      gap: 14,
    };

    return {
      width,
      height,
      isLandscape,
      isTablet,
      isPhone,
      contentMaxWidth,
      sidePadding,
      contentBlockStyle,
    };
  }, [width, height]);
}
