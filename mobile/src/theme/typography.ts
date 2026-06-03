import { TextStyle } from "react-native";
import { colors } from "./colors";

export const fontFamily = {
  regular: "Ubuntu-Regular",
  medium: "Ubuntu-Medium",
  bold: "Ubuntu-Bold",
  light: "Ubuntu-Light",
} as const;

export const text = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.navy,
    textAlign: "center",
  } satisfies TextStyle,
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.navy,
    textAlign: "center",
  } satisfies TextStyle,
  h3: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    color: colors.navy,
    textAlign: "center",
  } satisfies TextStyle,
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.gray700,
    lineHeight: 24,
    textAlign: "center",
  } satisfies TextStyle,
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.gray500,
    textAlign: "center",
  } satisfies TextStyle,
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.navyMid,
    textAlign: "center",
  } satisfies TextStyle,
  button: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.white,
  } satisfies TextStyle,
};
