import { Flex, Image } from "@chakra-ui/react";

export const HomePreview = (props: any) => {
  return (
    <Flex flex="1" overflow="hidden">
      <Image
        src="https://res.cloudinary.com/datasource/image/upload/v1731404922/shanovina/OIG3.GMJyWZDs_ui.Hutbuoo__ckhcyd.jpg"
        alt="Shanovina"
        maxH="450px"
        minW="300px"
        objectFit="cover"
        flex="1"
      />
      <Image
        display={{ base: "none", sm: "initial" }}
        src="https://res.cloudinary.com/datasource/image/upload/v1731404923/shanovina/OIG3.unTZll.9q0sbJBuGj5k8_pz23xz.jpg"
        alt="Shanovina"
        maxH="450px"
        objectFit="cover"
      />
    </Flex>
  );
};
