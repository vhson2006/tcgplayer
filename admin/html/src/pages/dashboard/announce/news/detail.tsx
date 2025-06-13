import { actions } from "components/dashboard/announce/news/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import parse from 'html-react-parser';
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";
import { jsonParse } from "utils/json";

const DetailNewsPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { detail } = useSelector((state: any) => state.newsReducer); 
  const { title, content } = detail;
  const { newsSlug } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_BY_SLUG_ASYNC(newsSlug))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="news.view" as={Link} to={makeUrl('/dashboard/announce', location)}/>
        <FormButton typical='edit' permission="news.update" as={Link} to={makeUrl(`/dashboard/announce/${newsSlug}/edit`, location)}/>
      </HStack>
      <MultiLanguageTabs 
        renderPanel={(lang: string) => (
          <>
            <Text noOfLines={1} fontSize='3xl' as='b'>{title && jsonParse(title)[lang]}</Text>
            <Box>
              <div id="editor" className="editor">{content && parse(jsonParse(content)[lang])}</div>
            </Box>
          </>
        )}
      />
    </Stack>
  )
}

export default DetailNewsPage;