import { Stack, Card, CardBody, StackDivider, Button, VisuallyHidden } from "@chakra-ui/react"
import { actions } from "components/dashboard/announce/news/slice";
import TextAreaInput from "modules/forms/TextAreaInput"
import TextInput from "modules/forms/TextInput"
import { useRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { defaultForm } from "utils/form"
import ContentEditor from "components/dashboard/announce/news/inputs/ContentEditor";
import NewsCategory from "components/dashboard/announce/news/inputs/NewsCategory";
import NewsTag from "components/dashboard/announce/news/inputs/NewsTag";
import { jsonParse } from "utils/json";
import Dropzone from "modules/forms/Dropzone";

const EditNewsForm = (props: any) => {
  const ref = useRef<any>(null);
  const form = defaultForm(useForm);
  const dispatch = useDispatch();
  const [ defaultContent, setDefaultContent ] = useState<any>('');
  const [ newsCategory, setNewsCategory ] = useState<any>();
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const [ newsTag, setNewsTag ] = useState<any>();
  const { lang, submitRef } = props;
  const { detail } = useSelector((state: any) => state.newsReducer); 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  useEffect(() => {
    if (detail.title) {
      form.setValue('title', jsonParse(detail.title)[lang])
    }
    if (detail.predefine) {
      form.setValue('predefine', jsonParse(detail.predefine)[lang])
    }
    if (detail.title) {
      form.setValue('author', detail.author)
    }
    if (detail.content) {
      setDefaultContent(jsonParse(detail.content)[lang])
    }
    if (detail.newsCategory) {
      setNewsCategory({value: detail.newsCategory?.type, label: jsonParse(detail.newsCategory?.typeName)[activedLanguage] })
    }
    if (detail.newsTags) {
      setNewsTag(detail.newsTags?.map((v: any) => ({ value: v.type, label: jsonParse(v.typeName)[activedLanguage] })))
    }
  }, [lang, detail.title, detail.content, detail.predefine, detail.author, detail.newsCategory, detail.newsTags]);
  
  const saveHandler = (data: any) => {
    const updateData = {
      ...data,
      id: detail.id,
      slug: detail.slug,
      content: ref.current.editor.getData(),
      category: newsCategory.value,
      tags: newsTag.map((v: any) => v.value),
      image: uploadedFiles[0]?.id,
      lang
    };
    dispatch(actions.UPDATE_ASYNC(updateData));
  }

  return (
    <form onSubmit={form.handleSubmit(saveHandler)}>
      <Stack direction={{ base: 'column', lg: 'row' }} justify="space-between">
        <Card w='100%'>
          <CardBody>
            <Stack spacing="5" divider={<StackDivider />}>
              <TextInput {...form} typical='news-title' />
              <TextAreaInput {...form} typical='news-predefine' />
              <TextInput {...form} typical='news-author' />
              <ContentEditor referent={ref} defaultValue={defaultContent}/>
              <NewsCategory value={newsCategory} onChange={setNewsCategory}/>
              <NewsTag isMulti value={newsTag} onChange={setNewsTag}/>
              <Dropzone mx={1} width="full" isMulti={false} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
              <VisuallyHidden>
                <Button type="submit" ref={submitRef}/>
              </VisuallyHidden>
            </Stack>  
          </CardBody>
        </Card>
      </Stack>
    </form>
  ) 
}

export default EditNewsForm