import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, HStack, useDisclosure } from '@chakra-ui/react'
import { Logo } from 'modules/icons'
import { ToggleButton } from 'modules/icons'
import { Sidebar } from 'commons/layouts/dashboard/sidebar/Sidebar'
import NotificationComponent from 'commons/layouts/dashboard/notification'

export const DashboardNavbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Box width="full" py="4" px={{ base: '4', md: '8' }} bg="bg.accent.default" color="fg.accent.subtle">
      <Flex justify="space-between">
        <Logo />
        <HStack>
          {/* <NotificationComponent color="fg.accent.default"/> */}
          <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
        </HStack>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          // Only disabled for showcase
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}

export default DashboardNavbar
