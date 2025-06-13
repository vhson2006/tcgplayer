import { switchAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  container: {
    color: "default",
    mr: 2,
  },
  track: {
    bg: "accent-subtle",
    p: 1,
    _checked: {
      bg: "accent",
      _disabled: {
        // * prop thumb.disabled not forwared
        ">span": {
          bg: "bg-subtle",
        },
      },
    },
    _focus: {
      boxShadow: "none",
    },
    _disabled: {
      // * prop thumb.disabled not forwared
      ">span": {
        bg: "disabled",
      },
      bg: "accent-subtle",
      _checked: {
        bg: "accent-disabled",
      },
    },
  },
  thumb: {
    bg: "accent",
    _checked: {
      bg: "bg-surface",
    },
  },
});
const sizes = {
  sm: {
    track: { w: 9, h: 4 },
    thumb: {
      w: 4,
      h: 4,
      _checked: {
        transform: "translateX(1.25rem)",
      },
    },
  },
};
const defaultProps = {
  size: "sm",
};
export const switchTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps,
});
