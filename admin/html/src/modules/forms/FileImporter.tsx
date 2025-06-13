import { VisuallyHidden } from "@chakra-ui/react";
import { maxFileSizeUpload, supportFileUpload } from "commons/config";
import { t } from "commons/languages/helper";
import { FormButton } from "modules/buttons/FormButton";
import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import notify from "utils/notify";
import * as XLSX from 'xlsx';

const FileImporter = (props: any) => {
  const importRef = useRef<any>(null);
  const { permission, onChange } = props;
  const { permission: permissionReducer } = useSelector((state: any) => state.authenticationReducer); 
  const importHandler = () => {
    importRef.current.click()
  }
  const handleChangeFiles = (e: any) => {
    try {
      e.preventDefault();
      const file = e.target.files[0];
      if (file && supportFileUpload.includes(file.type)) {
        if (file.size > maxFileSizeUpload) {
          notify.error(t('error.filesize'))
        } else {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            onChange(jsonData);
          };
          
          reader.readAsArrayBuffer(file)
        }
      } else {
        notify.error(t('error.filetype'))
      }
      e.target.value = null;
    } catch(er) {
      notify.error(t('message.error'))
      e.target.value = null;
    }
  }

  if (permission) {
    const permissionArr = permission.split('.')
    if (permissionReducer 
      && permissionReducer[permissionArr[0]] 
      && permissionReducer[permissionArr[0]].includes(permissionArr[1])
    ) {
      return (
        <Fragment>
          <VisuallyHidden>
            <input type="file" ref={importRef} onChange={handleChangeFiles}/>
          </VisuallyHidden>
          <FormButton typical="import" onClick={importHandler} />
        </Fragment>
      )
    }
    return <></>
  }

  return (
    <Fragment>
      <VisuallyHidden>
        <input type="file" ref={importRef} onChange={handleChangeFiles}/>
      </VisuallyHidden>
      <FormButton typical="import" onClick={importHandler} />
    </Fragment>
  )
}

export default FileImporter