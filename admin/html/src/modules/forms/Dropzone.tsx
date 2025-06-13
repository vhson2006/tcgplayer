import { Center, VStack, Square, Icon, HStack, Button, VisuallyHidden, Image, Text, List, ListIcon, ListItem, Stack, Box } from "@chakra-ui/react";
import { uploadFile } from "utils/api";
import { common } from "commons/config";
import { t, useFormatMessage as formatMessage } from "commons/languages/helper";
import { useRef, useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineAttachFile } from "react-icons/md";
import notify from "utils/notify";

const FileList = (props: any) => {
  const { uploadedFiles, setUploadedFiles } = props;
  const func = () => formatMessage({id: 'input.file.result-template'});
  const removeFileHandler = (file: any) => {
    setUploadedFiles(uploadedFiles.filter((u: any) => u.name !== file.name));
  }

  return (
    <List spacing={3}>
    {
      uploadedFiles.map((file: any, index: any) => 
        <ListItem key={index}>
          <ListIcon as={MdOutlineAttachFile} color={'blue.500'}/>
          <ListIcon as={AiOutlineDelete} color={'red.500'} onClick={() => removeFileHandler(file)}/>
          {func().replace('%s', file.name)}
        </ListItem>
      )
    }
    </List>
  )
}
const Dropzone = (props: any) => {
  const [ files, setFiles ] = useState<any[]>([]);
  const { uploadedFiles, setUploadedFiles, uploadState, isMulti, isDisabled, ...otherProps } = props;
  const inputFileRef = useRef<any>( null );
  const uploadButtonRef = useRef<any>( null );

  const handleChangeFiles = (event: any) => {
    setFiles([...event.target.files]);
  }

  useEffect(() => {
    if (Array.isArray(files) && files.length > 0) {
      uploadButtonRef.current.click();
    }
  }, [files])
  
  const uploadHandler = async (event: any) => {
    event.preventDefault();
    if (Array.isArray(files) && files.length > 0) {
      
      if (typeof uploadState === 'function') {
        uploadState(true);
      }
      const { size, type } = files[0]
      if (size > 10000000) {
        notify.error(t('error.filesize'))
      }
      if (type !== 'image/jpeg') {
        notify.error(t('error.filetype'))
      }
      if (size <= 10000000 && type === 'image/jpeg') {
        const response = await uploadFile(files);
        if (response.status === common.INCORRECT) {
          notify.error(t('message.error'))
        } else {
          setUploadedFiles(response.data);
        }
      }
      if (typeof uploadState === 'function') {
        uploadState(false);
      }
    }
  }

  return (
    <Center borderWidth="1px" borderRadius="lg" px="6" py="4" {...otherProps}>
      <VStack spacing="3">
        <Square size="10" bg="bg.subtle" borderRadius="lg">
          <Icon as={FiUploadCloud}  boxSize="5" color="fg.muted" />
        </Square>
        <VStack spacing="1">
          <HStack spacing="1" whiteSpace="nowrap">
            <Button variant="text" size="sm" isDisabled={isDisabled} onClick={() => {inputFileRef.current.click()}}>
              {t('input.file.text-button')}
            </Button>
            <VisuallyHidden>
              <input type="file" multiple={isMulti} ref={inputFileRef} onChange={handleChangeFiles}/>
              <Button ref={uploadButtonRef} onClick={uploadHandler}/>
            </VisuallyHidden>
          </HStack>
          <Text textStyle="xs" color="fg.muted">
            {formatMessage({id: 'input.file.image-hint'}).replace('%s', '2MB')}
          </Text>
          <FileList uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
        </VStack>
      </VStack>
    </Center>
  )
}
export default Dropzone