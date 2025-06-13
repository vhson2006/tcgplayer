import { Flex, Container, Stack, Text, Avatar } from "@chakra-ui/react";
import { renderAuthComponent } from "commons/layouts/render-component";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GrValidate } from "react-icons/gr";
import { activationCustomer } from "components/auth/api";
import { usePath } from "utils/link";
import { common } from "commons/consts";

const ActivationCustomerPage = (props: any) => {
  const [ view, setView ] = useState(false);
  const { t } = useTranslation("common");
  const { params } = usePath();
  const { token, email } = params
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await activationCustomer({ token, email })
        if (response?.status === common.INCORRECT) {
          router.push(`/`)
        } else {
          setView(true)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return renderAuthComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Container
        maxW="lg"
        py={{ base: "5", md: "10" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8" align="center" textAlign="center">
          {view && <Stack spacing="4" align="center">
            <Avatar bg='green.500' icon={<GrValidate  fontSize='1.5rem' />} />
            <Stack spacing="1">
              <Text fontWeight="semibold" textStyle="lg">{t('message#activation')}</Text>
              <Text color="fg.muted">{t('activation#message#hint')}</Text>
            </Stack>
          </Stack>}
        </Stack>
      </Container>
    </Flex>
  );
};

export default ActivationCustomerPage;
