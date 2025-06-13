import { Box, Center, Flex, HStack, Icon, Text, useColorModeValue as mode } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

type NavActionProps = {
  href?: string
  label: string
  icon: React.ElementType
  isActive?: boolean
  children?: React.ReactNode
  onClick?: any
}

const MobileNavAction = (props: NavActionProps) => {
  const { label, icon, isActive, href, children, onClick } = props
  const { t, lang } = useTranslation("common");
  
  return (
    <Center
      as="a"
      href={href}
      onClick={onClick}
      height="56px"
      rounded="4"
      aria-current={isActive ? 'page' : undefined}
      _activeLink={{ color: 'accent' }}
      _hover={{ bg: mode('gray.100', 'gray.700') }}
    >
      <Flex position="relative" direction="column" align="center" as="button">
        <Box fontSize="xl" as={icon} />
        <Text fontSize="sm" fontWeight="medium">
          {t(label)}
        </Text>
        {children}
      </Flex>
    </Center>
  )
}

const DesktopNavAction = (props: NavActionProps) => {
  const { label, icon, href = '#', onClick } = props
  const { t, lang } = useTranslation("common");

  return (
    <HStack spacing="2" as="a" href={href} onClick={onClick}>
      <Text fontSize="sm" fontWeight="semibold">
        {t(label)}
      </Text>
      <Icon as={icon} />
    </HStack>
  )
}

export const NavAction = {
  Mobile: MobileNavAction,
  Desktop: DesktopNavAction,
}
