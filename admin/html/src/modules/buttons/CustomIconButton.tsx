import { IconButton } from "@chakra-ui/react"
import { useSelector } from "react-redux";

const CustomIconButton = (props: any) => {
  const { permission, ...others } = props;
  const { permission: permissionReducer } = useSelector((state: any) => state.authenticationReducer); 
  if (permission) {
    const permissionArr = permission.split('.')
    if (permissionReducer 
      && permissionReducer[permissionArr[0]] 
      && permissionReducer[permissionArr[0]].includes(permissionArr[1])
    ) {
      return <IconButton {...others} />
    }
    return <></>
  }
  return <IconButton {...others} />
}

export default CustomIconButton