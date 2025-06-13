import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as newsActions } from "components/dashboard/announce/news/slice";
import TextAreaInput from "modules/forms/TextAreaInput";
import TextInput from "modules/forms/TextInput";
import { useRef, useState } from "react";
import NewsCategory from "components/dashboard/announce/news/inputs/NewsCategory";
import ContentEditor from "components/dashboard/announce/news/inputs/ContentEditor";
import NewsTag from "components/dashboard/announce/news/inputs/NewsTag";
import { usePath } from "utils/link";
import Dropzone from "modules/forms/Dropzone";

const AddNewsForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const ref = useRef<any>(null);
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const [ newsCategory, setNewsCategory ] = useState<any>();
  const [ newsTag, setNewsTag ] = useState<any>();
  const { submitRef } = props;
  const { params } = usePath();

  const addNewsHandler = (data: any) => {
    const addParams = {
      ...data,
      content: ref.current.editor.getData(),
      category: newsCategory.value,
      tags: newsTag?.map((v: any) => v.value),
      image: uploadedFiles[0]?.id,
      params
    };
    dispatch(newsActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addNewsHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='news-title' />
        <TextAreaInput {...form} typical='news-predefine' />
        <TextInput {...form} typical='news-author' />
        <ContentEditor referent={ref}/>
        <NewsCategory value={newsCategory} onChange={setNewsCategory}/>
        <NewsTag value={newsTag} onChange={setNewsTag}/>
        <Dropzone mx={1} width="full" isMulti={false} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddNewsForm;