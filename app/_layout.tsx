import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      secondary: string;
      menu: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  let dark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "rgb(28,28,28)",
      card: "rgb(42, 42, 44)",
      primary: "rgb(43,140,246)",
      secondary: "rgb(52,52,54)",
      menu: "rgb(42,42,44)",
    },
  };
  let light = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      card: "rgb(244, 243, 242)",
      primary: "rgb(32,126,248)",
      secondary: "rgb(230,230,232)",
      menu: "white",
    },
  };
  const theme = colorScheme === "dark" ? dark : light;

  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ title: "Chat" }} />
    </ThemeProvider>
  );
}
