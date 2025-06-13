import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MdAccessTime, MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
export const jobListings = [
  {
    uid: 'job001',
    title: 'Trụ Sở',
    description:
      'We are seeking a talented software engineer to join our team and contribute to the development of cutting-edge software solutions. You will collaborate with cross-functional teams to design, implement, and test software applications.',
    location: '125 Đào Duy Từ, Quận 5, Hồ Chí Minh, Việt Nam',
    time: 'Cả Ngày',
    email: 'admin@shanovina.com',
    phone: '0984763100',
  },
  {
    uid: 'job002',
    title: 'Chi Nhánh',
    description:
      'As a marketing specialist, you will be responsible for developing and executing marketing campaigns to promote our products and services. You will work closely with the marketing team to identify target audiences, create compelling content, and analyze campaign performance.',
    location: 'Hồng Ngự, Đồng Tháp, Việt Nam',
    time: 'Cả Ngày',
    email: 'admin@shanovina.com',
    phone: '0984763100',
  },
  
]

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export type JobListing = ElementType<typeof jobListings>
export const JobPosting = (props: JobListing) => {
  const { title, description, location, time, email, phone } = props

  return (
    <AccordionItem py="4">
      <AccordionButton gap={4} px="0">
        <Text as="h2" fontWeight="semibold" textStyle="xl">
          {title}
        </Text>
      </AccordionButton>
      <AccordionPanel px="0">
        <Stack spacing={{ base: '6', md: '8' }}>
          <Stack spacing={{ base: '4', md: '5' }}>
            {/* <Text color="fg.muted">{description}</Text> */}
            <Stack spacing={{ base: '5', md: '6' }} minW={375}>
              <HStack color="fg.muted">
                <Icon as={MdLocationOn} boxSize="5" />
                <Text as="span">{location}</Text>
              </HStack>
              <HStack color="fg.muted">
                <Icon as={MdAccessTime} boxSize="5" />
                <Text as="span">{time}</Text>
              </HStack>
              <HStack color="fg.muted">
                <Icon as={MdEmail} boxSize="5" />
                <Text as="span">{email}</Text>
              </HStack>
              <HStack color="fg.muted">
                <Icon as={MdPhone} boxSize="5" />
                <Text as="span">{phone}</Text>
              </HStack>
            </Stack>
          </Stack>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}