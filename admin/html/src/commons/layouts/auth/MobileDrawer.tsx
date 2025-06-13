import { Drawer, DrawerBody, DrawerContent, Stack, useDisclosure } from '@chakra-ui/react'
import { ToggleButton } from 'modules/icons'
import CollapseSelect from 'commons/layouts/dashboard/sidebar/CollapseSelect'
import { navbar } from 'commons/layouts/auth/config';
import { NavButton } from "modules/buttons/NavButton"

export const MobileDrawer = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  
  return (
    <>
      <ToggleButton
        isOpen={isOpen}
        onClick={onToggle}
        aria-label="Open menu"
        display={{ base: 'inline-flex', lg: 'none' }}
      />
      <Drawer placement="top" isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerBody mt="72px" p="4">
            <Stack spacing="1">
              {
                navbar.map((nav: any, idx: number) => {
                  if (Array.isArray(nav.children) && nav.children.length > 0) {
                    return (
                      <CollapseSelect 
                        key={idx}
                        variant="tertiary"
                        name={nav.name} 
                        items={nav.children} 
                      />
                    )
                  } else {
                    return (
                      <NavButton 
                        key={idx} 
                        label={nav.name} 
                        href={nav.href} 
                        icon={nav.icon} 
                        size="lg" variant="tertiary" 
                        justifyContent="start"
                      />
                    )
                  }
                })
              }
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}