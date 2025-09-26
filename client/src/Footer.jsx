import { Anchor, Container, Image, Text } from '@mantine/core';
import { Link } from 'react-router';

function Footer () {
  return (
    <Container p='2rem 1.25rem'>
      <Text mb='.75rem' fz='xs' lh='1rem' c='var(--mantine-color-text-secondary)'>Provided by</Text>
      <Image mb='.5rem' src='/assets/sfcivictech.png' w={138} />
      <Text fz='sm'>in partnership with<br />the City and County of San Francisco</Text>
      <Anchor component={Link} td='underline' fz='sm' to='https://sf.gov/LVProgram'>Permit program site</Anchor> <Anchor component={Link} ms='xl' td='underline' fz='sm' to='/privacy'>Privacy Policy</Anchor> <Anchor component={Link} ms='xl' td='underline' fz='sm' to='/disclaimer'>Disclaimer</Anchor>
    </Container>
  );
}

export default Footer;
