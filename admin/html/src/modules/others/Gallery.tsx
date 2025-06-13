import { HStack, Box, Image, Tag, Flex, SimpleGrid } from "@chakra-ui/react"
import { t } from "commons/languages/helper";

const Gallery = (props: any) => {
  const { value, onChange } = props;
  const deleteHandler = (id: any) => {
    onChange(value.filter((e: any) => e.id !== id))
  } 
  return (
    <SimpleGrid columns={{sm: 2, md: 4, lg: 6}} spacing={10}>
      {
        value?.map((e: any, idx: any) => (
          <Box key={idx} w={160} position="relative">
            <Image
              boxSize='160px'
              objectFit='cover'
              src={e.url}
              alt={e.alt}
            />
            <HStack spacing="1" position="absolute" bottom="1" right="1">
              {[
                {
                  name: t('button.delete'),
                  color: "red",
                },
                
              ]?.map((tag: any) => (
                <Tag
                  key={tag.name}
                  bg={`${tag.color}.500`}
                  color="white"
                  fontWeight="semibold"
                  onClick={() => deleteHandler(e.id)}
                >
                  {tag.name}
                </Tag>
              ))}
            </HStack>
          </Box>
        ))
      }
    </SimpleGrid>
  )
}

export default Gallery