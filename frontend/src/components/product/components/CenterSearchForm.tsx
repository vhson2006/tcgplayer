import { Stack, Input, Button, useColorModeValue, Center, Tag, TagLabel, SimpleGrid } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { defaultForm } from "utils/form";
import { useRouter } from "next/router";
import { createQuery, usePath } from "utils/link";
import { useSelector } from "react-redux";
import { FIRST_PAGE } from "commons/consts";

const CenterSearchForm = (props: any) => {
  const form = defaultForm(useForm);
  const { params } = usePath();
  const router = useRouter();
  const { t } = useTranslation("common");
  const { productTag } = useSelector(({ common }: any) => common);
  const searchHandler = async (data: any) => {
    router.push(`${router.pathname}?${createQuery({ ...params, ...data })}`);
  };
  
  const tagSelect = async (tag: string) => {
    router.push(`${router.pathname}?${createQuery({ ...params, tag, page: FIRST_PAGE })}`);
  };

  return (
    <Stack>
      <Center width={{ base: 300, md: 1000 }}>
        <form onSubmit={form?.handleSubmit(searchHandler)} style={{ width: '80%' }}>
          <Stack spacing={{base: 6, md: 12}} direction={{ base: "column", md: "row" }} w={{base: "85%", md: "full"}}>
            <Input
              {...form?.register("search", { required: false })}
              type={"text"}
              placeholder={t("button#search")}
              color={useColorModeValue("gray.800", "gray.200")}
              bg={useColorModeValue("orange.100", "orange.600")}
              rounded={"full"}
              border={0}
              _focus={{
                bg: useColorModeValue("gray.200", "gray.800"),
                outline: "none",
              }}
            />
            <Button variant="primary"  type="submit">
              {t("button#search")}
            </Button>
          </Stack>
        </form>
      </Center>
      {/* <SimpleGrid
        columns={{ base: 2, sm: 3, md: 6, lg: 8 }}
        gap={{ base: "2", lg: "4" }}
        my={4}
      >
      {
        productTag.map(({ value, label }: any) => 
          <Tag size='lg' colorScheme='red' borderRadius='full' onClick={() => tagSelect(value)}>
            <TagLabel >{label}</TagLabel>
          </Tag>
        )
      }
      </SimpleGrid> */}
    </Stack>
  );
};
export default CenterSearchForm