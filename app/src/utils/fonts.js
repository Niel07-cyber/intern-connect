import { Platform } from "react-native";

export const fonts = {
  Regular: Platform.OS === "ios" ? "PlayfairDisplay-Regular" : "PlayfairDisplayRegular",
  Italic: Platform.OS === "ios" ? "PlayfairDisplay-Italic" : "PlayfairDisplayItalic",
  Bold: Platform.OS === "ios" ? "PlayfairDisplay-Bold" : "PlayfairDisplayBold",
  SemiBold: Platform.OS === "ios" ? "PlayfairDisplay-SemiBold" : "PlayfairDisplaySemiBold",
};