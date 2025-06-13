import { Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import { BlogAuthor } from "./BlogAuthor";
import { NewPreview } from "./NewPreview";
import { Tags } from "./Tags";
import { jsonParse } from "utils/json";
import { makeUrl } from "utils/link";
import { useSelector } from "react-redux";

export const NewsGrid = (props: any) => {
  const { list } = useSelector(({ news }: any) => news);
  const { lang } = useTranslation("common");

  return (
    <>
      {list?.map((post: any) => (
        <Flex pb="10" key={post.id} flexDirection={{ base: "column", sm: "row" }} >
          <NewPreview post={post} />
          <Flex
            flex="1"
            flexDirection="column"
            justifyContent="center"
            // marginTop={{ base: "3", sm: "0" }}
          >
            <Tags tags={post?.newsTags?.map((n: any) => jsonParse(n.typeName)[lang])} />
            <Stack spacing="0.25">
              <Text fontSize="3xl" marginTop="1" noOfLines={1}>
                <NextLink href={makeUrl(`/news/${post.slug}`, lang)} passHref>
                  {jsonParse(post?.title)[lang] }
                </NextLink>
              </Text>
            </Stack>
            <Stack >
              <Text fontSize="xl" marginTop="2" noOfLines={2} >
                {jsonParse(post.predefine)[lang]?.replace(/<[^>]*>/g, "") || ''}
              </Text>
            </Stack>
            <BlogAuthor name={post.author} date={new Date(post.updated)} />
          </Flex>
        </Flex>
      ))}
    </>
  );
};
