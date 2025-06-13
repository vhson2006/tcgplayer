import { Button } from '@chakra-ui/react'
import { t } from 'commons/languages/helper';
import { setting } from 'modules/buttons/config';
import { useSelector } from 'react-redux';

export const FormButton = (props: any) => {
  const { typical, permission, ...buttonProps } = props
  const { permission: permissionReducer } = useSelector((state: any) => state.authenticationReducer); 
  if (permission) {
    const permissionArr = permission.split('.')
    if (permissionReducer 
      && permissionReducer[permissionArr[0]] 
      && permissionReducer[permissionArr[0]].includes(permissionArr[1])
    ) {
      return (
        <Button 
          variant={setting[typical].variant ? setting[typical].variant : 'primary'} 
          leftIcon={setting[typical].icon}
          {...buttonProps}
        >
          {t(setting[typical].text)}
        </Button>
      )
    }
    return <></>
  }
  
  return (
    <Button 
      variant={setting[typical].variant ? setting[typical].variant : 'primary'} 
      leftIcon={setting[typical].icon}
      {...buttonProps}
    >
      {t(setting[typical].text)}
    </Button>
  )
}
