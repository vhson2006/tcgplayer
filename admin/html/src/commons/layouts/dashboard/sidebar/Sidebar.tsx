import { Box, Divider, Flex, Stack, Tooltip, useDisclosure } from '@chakra-ui/react'
import { Logo, WhiteLogo } from 'modules/icons';
import { NavButton } from "modules/buttons/NavButton"
import { UserProfile } from 'commons/layouts/dashboard/sidebar/UserProfile'
import { sidebar } from 'commons/layouts/dashboard/sidebar/config';
import CollapseSelect from 'commons/layouts/dashboard/sidebar/CollapseSelect';
import { supportLanguages } from 'commons/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { t } from 'commons/languages/helper';
import { useSelector } from 'react-redux';
import { targetHaveValueInSource } from 'utils/array';
import { Fragment } from 'react';

export const Sidebar = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true});
  const { permission } = useSelector((state: any) => state.authenticationReducer); 

  return (
    <Box  maxW={{ base: 'full', sm: 'xs' }} >
      <Flex
        flex="1"
        bg="bg.accent.default"
        color="fg.accent.default"
        overflowY="auto"
        py={{ base: '2' }}
        px={{ base: '2' }}
        height={'100%'}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing="1" shouldWrapChildren>
            <Tooltip label={t('sidebar.hint')}>
              <Box py={{ base: '4' }} px={{ base: '4' }}>
                {isOpen ? <WhiteLogo onClick={onToggle}/> : <Logo onClick={onToggle}/>}
              </Box>
            </Tooltip>
            <Stack spacing="1" minH='90vh'>
              {
                sidebar(location, navigate).map((schil: any, scidx: number) => { 
                  if ((schil.permission === false || (permission && Array.isArray(schil.permission) && targetHaveValueInSource(schil.permission, Object.keys(permission))))) {
                    const path = location.pathname.split('/').filter(e => e);
                    if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
                      path.shift();
                    }
                    const isActived = `/${path.join('/')}` === schil.href;
                    
                    return (
                      Array.isArray(schil.children) && schil.children.length > 0
                      ? <Box key={scidx} >
                          <CollapseSelect 
                            isFull={isOpen}
                            isActived={isActived}
                            variant="tertiary.accent"
                            icon={schil.icon} 
                            name={schil.name} 
                            permission={schil.permission}
                            items={schil.children}  
                          />
                        </Box>
                      : <NavButton 
                          key={scidx} 
                          isFull={isOpen}
                          isActived={isActived} 
                          label={schil.name} 
                          href={schil.href} 
                          icon={schil.icon} 
                          permission={schil.permission}
                          onClick={schil.onClick}
                        />
                    )
                  } else {
                    return <Fragment key={scidx}></Fragment>
                  }
                })  
              }
            </Stack>
          </Stack>
          {/* <Stack spacing={{ base: '5', sm: '6' }} pb="10">
            <Divider borderColor="bg-accent-subtle" />
            <UserProfile
              isFull={isOpen}
              name="Administrator"
              image="https://res.cloudinary.com/datasource/image/upload/v1731406831/shanovina/default_m1c6va.jpg"
              email="admin@shanovina.com"
            />
          </Stack> */}
        </Stack>
      </Flex>
    </Box>
  )
}

export default Sidebar