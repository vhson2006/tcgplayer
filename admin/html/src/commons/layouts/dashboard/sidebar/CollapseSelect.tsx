import { useDisclosure, Button, Collapse, Stack, Text, HStack, Tooltip } from "@chakra-ui/react"
import { PopoverIcon } from "modules/icons"
import { NavButton } from "modules/buttons/NavButton"
import { t } from 'commons/languages/helper';
import { GeneralButton } from 'modules/buttons/GeneralButton';
import { supportLanguages } from "commons/config";
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { targetHaveValueInSource } from "utils/array";

const CollapseSelect = (props: any) => {
  const { isOpen, onOpen, onToggle } = useDisclosure()
  const { icon, name, items, permission, isActived, variant, isFull = true } = props
  const location = useLocation();
  const { permission: permissionReducer } = useSelector((state: any) => state.authenticationReducer); 

  useEffect(() => {
    // onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if ((permission === false || 
    (permissionReducer && Array.isArray(permission) && targetHaveValueInSource(permission, Object.keys(permissionReducer))))
  ) {
    return (
      <>
        {
          isFull ? (
            <Button 
              className={isActived ? "class-actived" : ""}
              justifyContent="space-between" 
              variant={variant ? variant : "tertiary" }
              size="lg" 
              onClick={onToggle}
            >
              <HStack spacing="3">
                {icon ? icon : <></>}
                <Text as="span">{t(name)}</Text>
              </HStack>
              <PopoverIcon isOpen={isOpen} />
            </Button>
          ) : (
            <Tooltip label={t(name)}>
              <Button 
                className={isActived ? "class-actived" : ""}
                justifyContent="space-between" 
                variant={variant ? variant : "tertiary" }
                size="lg" 
                onClick={onToggle}
              >
                <HStack spacing="3">
                  {icon ? icon : <></>}
                </HStack>
                <PopoverIcon isOpen={isOpen} />
              </Button>
            </Tooltip>
          )
        }
        <Collapse in={isOpen} animateOpacity>
          <Stack spacing="1" alignItems="stretch" ps="4">
            {
              Array.isArray(items)
              && items.map((item: any, idx: number) => {
                const { children, permission } = item;
                if ((permission === false || 
                  (permissionReducer && Array.isArray(permission) && targetHaveValueInSource(permission, Object.keys(permissionReducer))))
                ) {
                  const path = location.pathname.split('/').filter(e => e);
                  if (Array.isArray(path) 
                    && path.length > 0 
                    && Object.keys(supportLanguages).includes(path[0])
                  ) {
                    path.shift();
                  }
                  const isActived = `/${path.join('/')}` === item.href ;
                  if (Array.isArray(children) && children.length > 0) {
                    return (
                      <CollapseSelect
                        key={idx} 
                        isFull={isFull}
                        isActived={isActived}
                        variant={item.variant ? item.variant : "tertiary" } 
                        icon={item.icon} 
                        name={item.name} 
                        permission={permission}
                        items={item.children}
                      />
                    )
                  }
                  
                  if (item.href) {
                    return <NavButton 
                      key={idx} 
                      isFull={isFull}
                      isActived={isActived} 
                      variant={item.variant ? item.variant : "tertiary.accent" } 
                      icon={item.icon} 
                      label={item.name} 
                      permission={permission}
                      href={item.href}
                    />
                  }
                  
                  return (
                    <GeneralButton
                      key={idx}
                      isFull={isFull}
                      variant={variant ? variant : "tertiary.accent" } 
                      icon={item.icon} 
                      label={item.name} 
                      onClick={item.onClick}
                    />
                  )
                } else {
                  <Fragment key={idx}></Fragment>
                }
              })
            }
          </Stack>
        </Collapse>
      </>
    )
  } else {
    return <Fragment></Fragment>
  }
  
}
export default CollapseSelect