import { Box, Flex, Link, Image, useColorModeValue } from "@chakra-ui/react";

export const NewPreview = (props: any) => {
  const { post } = props;
  return (
    // <Flex flex="1" marginRight="3" position="relative" alignItems="center">
      <Box
        maxW={{ base: "100%", sm: "100%", md: "35%" }}
        zIndex="2"
        marginRight={{ base: "0", sm: "5%" }}
        marginLeft={{ base: "0", sm: "5%" }}
        // marginTop="5%"
      >
        <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
          <Image
            boxSize={{ base: '400px', sm: '400px', md: '200px' }}
            borderRadius="lg"
            src={post.image?.url}
            alt="some good alt text"
            objectFit="contain"
          />
        </Link>
      </Box>
    //   <Box zIndex="1" width="100%" position="absolute" height="100%">
    //     <Box
    //       bgGradient={useColorModeValue(
    //         "radial(orange.600 1px, transparent 1px)",
    //         "radial(orange.300 1px, transparent 1px)"
    //       )}
    //       backgroundSize="20px 20px"
    //       opacity="0.4"
    //       height="100%"
    //     />
    //   </Box>
    // </Flex>
  );
};
