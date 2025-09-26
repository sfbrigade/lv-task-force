import { Container, Image, Text } from '@mantine/core';

function Footer () {
  return (
    <Container p='2rem 1.25rem'>
      <Text mb='.75rem' fz='xs' lh='1rem' c='var(--mantine-color-text-secondary)'>Provided by</Text>
      <Image mb='.5rem' src='/assets/sfcivictech.png' w={138} />
      <Text fz='sm'>in partnership with the City and County of San Francisco</Text>
    </Container>
  );
}

export default Footer;
