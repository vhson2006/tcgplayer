import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import * as components from './components'
import * as foundations from './foundations'
import '@fontsource-variable/inter'
import '@fontsource-variable/open-sans'
import '@fontsource-variable/spline-sans'

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};
export const theme: Record<string, any> = extendTheme(
  {
    ...foundations,
    
    components: {
      ...components,
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .custom_select + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top"
              }
            }
          }
        }
      }
    },
    colors: { ...baseTheme.colors, brand: baseTheme.colors.teal },
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
  extendTheme(proTheme),
)