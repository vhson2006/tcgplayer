import { Button, HStack, Text, Tooltip } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation';

export const GeneralButton = (props: any) => {
  const { icon, label, href, variant, onClick, isFull = true, ...buttonProps } = props
  const { t } = useTranslation("common");

  return isFull ? (
    <Button 
      variant={variant ? variant : "tertiary"} 
      justifyContent="start"
      onClick={onClick}
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
