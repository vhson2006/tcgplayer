import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
const baseStyle = defineStyle({
  opacity: "unset",
  borderColor: "bg-subtle",
  borderWidth: "2px",
});
export const dividerTheme = defineStyleConfig({
  baseStyle,
});
