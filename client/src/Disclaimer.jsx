import { Container, Text, Title } from '@mantine/core';
import { Head } from '@unhead/react';
import { useTranslation } from 'react-i18next';

function Disclaimer () {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('disclaimer.metaTitle')}</title>
      </Head>
      <Container>
        <Title order={1} mb='lg'>{t('disclaimer.title')}</Title>
        <Title order={2}>{t('disclaimer.subtitle')}</Title>
        <Text>{t('disclaimer.intro')}</Text>
        <Title order={3} mt='md'>{t('disclaimer.liabilityTitle')}</Title>
        <Text>{t('disclaimer.liabilityText')}</Text>
        <Title order={3} mt='md'>{t('disclaimer.browserTitle')}</Title>
        <Text>{t('disclaimer.browserText')}</Text>
      </Container>
    </>
  );
}

export default Disclaimer;
