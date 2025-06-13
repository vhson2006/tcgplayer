//@ts-nocheck
import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import { components } from "./components";
import * as foundations from "./foundations";
import { styles } from "./styles";
import "@fontsource/inter";

export const theme: Record<string, any> = extendTheme(
  {
    styles,
    ...foundations,
    colors: { ...foundations.colors, brand: foundations.colors["purple"] },
    components,
    // fonts: {
    //   heading: "'Courier New', monospace",
    //   body: "'Courier New', monospace",
    // },
    fonts: {
      heading: "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
      body: "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
    },
    // fonts: {
    //   heading: "'Inter Variable', -apple-system, system-ui, sans-serif",
    //   body: "'Inter Variable', -apple-system, system-ui, sans-serif",
    // },
  },
  extendTheme(proTheme)
);
