import { Button, HStack, Text, Tooltip } from '@chakra-ui/react'
import { t } from 'commons/languages/helper';

export const GeneralButton = (props: any) => {
  const { icon, label, href, variant, onClick, isFull = true, ...buttonProps } = props

  return isFull ? (
    <Button 
      variant={variant ? variant : "tertiary"} 
      size="lg" 
      justifyContent="start"
      onClick={onClick}
      {...buttonProps}
    >
      <HStack spacing="3">
        {icon ? icon : <></>}
        {label && <Text>{t(label)}</Text>}
      </HStack>
    </Button>
  ) : (
    <Tooltip label={t(label)}>
      <Button 
        variant={variant ? variant : "tertiary"} 
        size="lg" 
        justifyContent="start"
        onClick={onClick}
        {...buttonProps}
      >
        <HStack spacing="3">
          {icon ? icon : <></>}
        </HStack>
      </Button>
    </Tooltip>
  )
}
