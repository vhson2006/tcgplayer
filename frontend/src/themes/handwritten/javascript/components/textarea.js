import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { inputTheme } from "./input";
const baseStyle = defineStyle({
  width: "100%",
  outline: 0,
  transition: "all 250ms",
  border: "2px",
  py: 4,
  px: 6,
});
const variants = {
  outline: defineStyle(() => inputTheme.variants?.outline().field ?? {}),
};
const defaultProps = {
  variant: "outline",
};
export const textareaTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps,
});
