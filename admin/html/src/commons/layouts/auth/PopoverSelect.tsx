import { 
  Button, HStack, Popover, PopoverBody, PopoverContent, 
  PopoverTrigger, Stack, useDisclosure, Text,
} from '@chakra-ui/react'
import { NavButton } from "modules/buttons/NavButton"
import { PopoverIcon } from 'modules/icons'
import { t } from 'commons/languages/helper';
import { GeneralButton } from 'modules/buttons/GeneralButton';

export const PopoverSelect = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { name, items, icon } = props

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} trigger="hover" openDelay={0}>
      <PopoverTrigger>
        <Button justifyContent="space-between" size="lg">
          <HStack spacing="3">
            {icon ? icon : <></>}
            {name ?  <Text as="span">{t(name)}</Text> : <></>}
          </HStack>
          {/* <PopoverIcon isOpen={isOpen} /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent p="2" maxW="220">
      <PopoverBody>
        <Stack spacing="0" >
          {
            Array.isArray(items) 
            && items.map((item: any, idx: number) => item.href 
            ? <NavButton 
                key={idx} 
                icon={item.icon} 
                label={item.name} 
                href={item.href}
                onClick={item.onClick}
              />
            : <GeneralButton
                key={idx}
                icon={item.icon} 
                label={item.name} 
                onClick={item.onClick}
              />)
          }
        </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
} 

