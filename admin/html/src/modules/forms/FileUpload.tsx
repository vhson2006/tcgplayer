import { VisuallyHidden } from "@chakra-ui/react";
import { useRef, Fragment } from "react";
import { FormButton } from "modules/buttons/FormButton";
import { useSelector } from "react-redux";

const FileUpload = (props: any) => {
  const { permission, onChange } = props;
  const { permission: permissionReducer } = useSelector((state: any) => state.authenticationReducer); 
  const inputFileRef = useRef<any>( null );
  
  if (permission) {
    const permissionArr = permission.split('.')
    if (permissionReducer 
      && permissionReducer[permissionArr[0]] 
      && permissionReducer[permissionArr[0]].includes(permissionArr[1])
    ) {
      return (
        <Fragment>
          <FormButton typical="import" onClick={() => {inputFileRef.current.click()}} />
          <VisuallyHidden>
            <input type="file" ref={inputFileRef} onChange={onChange}/>
          </VisuallyHidden>
        </Fragment>
      )
    }
    return <></>
  }

  return (
    <Fragment>
      <FormButton typical="import" onClick={() => {inputFileRef.current.click()}} />
      <VisuallyHidden>
        <input type="file" ref={inputFileRef} onChange={onChange}/>
      </VisuallyHidden>
    </Fragment>
  )
}
export default FileUpload