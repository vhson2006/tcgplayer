import { Box, ButtonGroup, Container, HStack } from '@chakra-ui/react'
import { MobileDrawer } from './MobileDrawer'
import { WhiteLogo } from 'modules/icons'
import { PopoverSelect } from 'commons/layouts/auth/PopoverSelect'
import { NavButton } from "modules/buttons/NavButton"
import { navbar } from 'commons/layouts/auth/config';
import { supportLanguages } from 'commons/config'
import { MdOutlineLanguage } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'

export const AuthNavbarComponent = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const switchLanguage = (lang: any) => {
    const path = location.pathname.split('/').filter((e: any) => e);
    if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
      path.shift()
    }
    navigate(`/${lang}/${path.join('/')}`)
  }
  
  return (
    <Box as="section" >
      <Box 
        // borderBottomWidth="1px" 
        bg="bg.accent.default" 
        position="relative" 
        zIndex="tooltip"
      >
        <Container py="4">
          <HStack justify="space-between" spacing="8">
            <HStack spacing="10">
              <HStack spacing="3">
                <MobileDrawer />
                <WhiteLogo />
              </HStack>
              <ButtonGroup
                size="lg"
                variant="text.accent"
                colorScheme="gray"
                spacing="8"
                display={{ base: 'none', lg: 'flex' }}
              >
                {
                  navbar.map((nav: any, idx: number) => {
                    if (Array.isArray(nav.children) && nav.children.length > 0) {
                      return (
                        <PopoverSelect 
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
                          variant="text.accent"
                        />
                      )
                    }
                  })
                }
              </ButtonGroup>
            </HStack>
            <HStack spacing={{ base: '2', md: '4' }}>
              <ButtonGroup
                size="lg"
                variant="text.accent"
                colorScheme="gray"
                spacing="8"
                display='flex'
              >
                <PopoverSelect 
                  variant="tertiary"
                  icon={<MdOutlineLanguage />} 
                  // name={'language.title'} 
                  items={
                    Object.values(supportLanguages)
                    .filter(f => f.key !== '/')
                    .map((lang: any) => ({
                      name: lang.name,
                      href: '',
                      icon: lang.icon,
                      onClick: () => switchLanguage(lang.key),
                    })) 
                  } 
                />
              </ButtonGroup>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  )
} 

export default AuthNavbarComponent