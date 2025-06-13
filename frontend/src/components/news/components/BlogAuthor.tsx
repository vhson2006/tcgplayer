import { HStack, Image, Text } from "@chakra-ui/react";
import { BlogAuthorProps } from "../../../typescripts/common";

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="/default.jpg"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium" noOfLines={1}>{props.name}</Text>
      <Text>—</Text>
      <Text noOfLines={1}>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};
