import { Button, Tooltip } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { t } from 'commons/languages/helper';
import { makeUrl } from 'utils/link';
import { GeneralButton } from 'modules/buttons/GeneralButton';
import { useSelector } from 'react-redux';
import { targetHaveValueInSource } from 'utils/array';
import { Fragment } from 'react';

export const NavButton = (props: any) => {
  const location = useLocation();
  const { icon, label, href, permission, variant, isActived, onClick, isFull = true, ...buttonProps } = props
  const { permission: permissionReducer } = useSelector((state: any) => state.authenticationReducer); 

  if ((permission === false || 
    (permissionReducer && Array.isArray(permission) && targetHaveValueInSource(permission, Object.keys(permissionReducer))))
  ) {
    if (href === '') {
      return (
        <GeneralButton
          isFull={isFull}
          variant={variant ? variant : "ghost-on-accent" } 
          icon={icon} 
          label={label} 
          onClick={onClick}
        />
      )
    }
    
    return isFull ? (
      <Button 
        className={isActived ? "class-actived" : ""} 
        variant={variant ? variant : "ghost-on-accent"} 
        justifyContent="start" 
        {...buttonProps}
        leftIcon={icon ? icon : <></>}
        as={Link}
        to={makeUrl(href, location)} 
        unstable_viewTransition
      >
        {t(label)}
      </Button>
    ) : (
      <Tooltip label={t(label)}>
        <Button 
          className={isActived ? "class-actived" : ""} 
          variant={variant ? variant : "ghost-on-accent"} 
          justifyContent="start" 
          {...buttonProps}
          leftIcon={icon ? icon : <></>}
          as={Link}
          to={makeUrl(href, location)} 
          unstable_viewTransition
        />
      </Tooltip>
    )
  } else {
    return <Fragment></Fragment>
  }  
}
