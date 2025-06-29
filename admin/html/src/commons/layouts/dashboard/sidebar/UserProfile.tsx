import { Avatar, Box, HStack, Text, Tooltip } from '@chakra-ui/react'

interface UserProfileProps {
  name: string
  image: string
  email: string
  isFull: boolean
}

export const UserProfile = (props: UserProfileProps) => {
  const { name, image, email, isFull = true } = props
  return isFull ? (
    <HStack spacing="3" ps="2">
      <Avatar name={name} src={image} boxSize="10" />
      <Box>
        <Text color="on-accent" fontWeight="medium" fontSize="sm">
          {name}
        </Text>
        <Text color="on-accent-muted" fontSize="sm">
          {email}
        </Text>
      </Box>
    </HStack>
  ) : (
    <Tooltip label={name}>
      <HStack spacing="3" ps="2">
        <Avatar name={name} src={image} boxSize="10" />
      </HStack>
    </Tooltip>
  )
}
