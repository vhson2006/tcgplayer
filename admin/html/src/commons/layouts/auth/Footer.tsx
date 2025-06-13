import { Box, Text, Container, Stack, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { Logo } from 'modules/icons';

const Footer = (props: any) => {
  return (
    <Box 
      // borderTopWidth="1px"  
      bg="bg.accent.default" 
      color="fg.accent.default"
    >
      <Container as="footer" role="contentinfo" py={{ base: '6', md: '8' }}>
        <Stack spacing={{ base: '2', md: '3' }}>
          <Stack justify="space-between" direction="row" align="center">
            <Logo />
            <ButtonGroup variant="tertiary.accent">
              <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin />} />
              <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub />} />
              <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter />} />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" color="fg.accent.subtle">
            &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer;