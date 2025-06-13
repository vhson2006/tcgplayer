import { FormControl, FormLabel, Icon, Stack, Text } from "@chakra-ui/react";
import { ChakraStylesConfig, Select, chakraComponents } from "chakra-react-select";
import { RiCloseLine, RiArrowDropDownLine } from "react-icons/ri";
import { t } from "commons/languages/helper";

export const CustomSelect = (props: any) => {
  const { name, placeholder, isFloating, isRequired, value, errorMessage, ...others } = props;
  
  const chakraStyles: ChakraStylesConfig = {
    menu: (provide) => ({
      ...provide,
      zIndex: 1000,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "blue.100" : provided.background,
      p: 0,
      w: "40px",
    }),
    
  };
  
  const customComponents = {
    Option: ({ children, ...props }: any) => (
      <chakraComponents.Option {...props}>
        <div>{props.data.icon} {children}</div>
      </chakraComponents.Option>
    ),
    ClearIndicator: (props: any) => (
      <chakraComponents.ClearIndicator {...props}>
        <Icon as={RiCloseLine} w="6" h="6"/>
      </chakraComponents.ClearIndicator>
    ),
    DropdownIndicator: (props: any) => (
      <chakraComponents.DropdownIndicator {...props}>
        <Icon as={RiArrowDropDownLine} w="6" h="6"/>
      </chakraComponents.DropdownIndicator>
    ),
    LoadingIndicator: (props: any) => (
      <chakraComponents.LoadingIndicator
        // The color of the main line which makes up the spinner
        // This could be accomplished using `chakraStyles` but it is also available as a custom prop
        color="currentColor" // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
        // The color of the remaining space that makes up the spinner
        emptyColor="transparent"
        // The `size` prop on the Chakra spinner
        // Defaults to one size smaller than the Select's size
        spinnerSize="md"
        // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
        speed="0.45s"
        // A CSS size string representing the thickness of the spinner's line
        thickness="2px"
        // Don't forget to forward the props!
        {...props}
      />
    ),
  };

  return (
    <FormControl 
      // maxW='xs'
      variant={isFloating ? 'floating' : ''}
      id={name} 
      isRequired={isRequired}
    >
      <Select 
        placeholder={isFloating ? '' : placeholder}
        chakraStyles={chakraStyles} 
        components={customComponents}
        className={(Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value) ? 'custom_select' : ''}
        isInvalid={errorMessage ? true : false}
        errorBorderColor='red.300'
        value={value}
        {...others}
      />
      {
        isFloating && <FormLabel>{placeholder}</FormLabel>
      }
      {
        errorMessage &&
        <Stack pt="1">
          <Text color='tomato' fontSize='10px'>
            <i>{t(errorMessage)}</i>
          </Text>
        </Stack>
      }
    </FormControl>
  )
};

export default CustomSelect