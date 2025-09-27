import { Anchor, Container, Image, Text } from '@mantine/core';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

function Footer () {
  const { t } = useTranslation();
  return (
    <Container p='2rem 1.25rem'>
      <Text mb='.75rem' fz='xs' lh='1rem' c='var(--mantine-color-text-secondary)'>{t('footer.providedBy')}</Text>
      <Image mb='.5rem' src='/assets/sfcivictech.png' w={138} />
      <Text fz='sm'>{t('footer.partnershipLine1')}<br />{t('footer.partnershipLine2')}</Text>
      <Anchor component={Link} td='underline' fz='sm' to='https://sf.gov/LVProgram'>{t('footer.permitProgramSite')}</Anchor> <Anchor component={Link} ms='xl' td='underline' fz='sm' to='/privacy'>{t('footer.privacyPolicy')}</Anchor> <Anchor component={Link} ms='xl' td='underline' fz='sm' to='/disclaimer'>{t('footer.disclaimer')}</Anchor>
    </Container>
  );
}

export default Footer;
