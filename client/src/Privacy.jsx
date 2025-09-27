import { Container, Text, Title } from '@mantine/core';
import { Head } from '@unhead/react';
import { useTranslation } from 'react-i18next';

function Privacy () {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('privacy.metaTitle')}</title>
      </Head>
      <Container>
        <Title order={1}>{t('privacy.title')}</Title>
        <Text mb='lg'>{t('privacy.intro')}</Text>
        <Title order={2}>{t('privacy.generalPolicy')}</Title>
        <Title order={3} mt='md'>{t('privacy.infoCollectionTitle')}</Title>
        <Text mb='sm'>{t('privacy.infoCollectionP1')}</Text>
        <Text mb='sm'>{t('privacy.infoCollectionP2')}</Text>
        <Text mb='sm'>{t('privacy.infoCollectionP3')}</Text>
        <Title order={3} mt='md'>{t('privacy.infoYouProvideTitle')}</Title>
        <Text mb='sm'>{t('privacy.infoYouProvideP1')}</Text>
        <Text mb='sm'>{t('privacy.infoYouProvideP2')}</Text>
        <Text mb='sm'>{t('privacy.infoYouProvideP3')}</Text>
        <Title order={3} mt='md'>{t('privacy.siteAnalyticsTitle')}</Title>
        <Text mb='sm'>{t('privacy.siteAnalyticsP1')}</Text>
        <Title order={3} mt='md'>{t('privacy.linksTitle')}</Title>
        <Text mb='sm'>{t('privacy.linksP1')}</Text>
        <Title order={3} mt='md'>{t('privacy.siteSecurityTitle')}</Title>
        <Text mb='sm'>{t('privacy.siteSecurityP1')}</Text>
        <Text mb='sm'>{t('privacy.siteSecurityP2')}</Text>
        <Title order={3} mt='md'>{t('privacy.policyChangesTitle')}</Title>
        <Text mb='sm'>{t('privacy.policyChangesP1')}</Text>
      </Container>
    </>
  );
}

export default Privacy;
