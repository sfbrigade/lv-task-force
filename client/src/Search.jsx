import { Container, Stack, Title, Text, Card, Button } from '@mantine/core';
import { useSearchParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Head } from '@unhead/react';
import { useTranslation } from 'react-i18next';

function Search () {
  const [searchParams] = useSearchParams();
  const licensePlateNumber = searchParams.get('licensePlateNumber')?.trim() ?? '';
  const { t } = useTranslation();

  const query = useQuery({
    enabled: !!licensePlateNumber,
    queryKey: ['licensePlateNumber', licensePlateNumber],
    queryFn: async () => {
      const response = await fetch(`/api/largevehicles/eligibility?search=${licensePlateNumber}`);
      return response.json();
    },
  });

  return (
    <>
      <Head>
        <title>{t('search.metaTitle')}</title>
      </Head>
      <Container>
        <Stack>
          <Text fw='600'><Text c='var(--mantine-color-text-secondary)' span>{t('search.licensePlateLabel')}</Text> {licensePlateNumber.toUpperCase().trim()}</Text>
          {!query.isPending && !query.data &&
            <Stack>
              <Title c='var(--mantine-color-text-danger)' order={2}>{t('search.notFoundTitle')}</Title>
              <Text fw='600'>{t('search.notFoundInstruction')}</Text>
              <Button component={Link} to='/'>{t('search.reenterButton')}</Button>
              <Card>
                <Stack>
                  <Text fw='600'>{t('search.appealCardText')}</Text>
                  <Button component={Link} to='https://digital.forms.sf.gov/t/vpMQz4c7Jmus'>{t('search.submitAppeal')}</Button>
                  <Button variant='secondary' component={Link} to='https://www.sf.gov/large-vehicle-program-community-events'>{t('search.findCommunityEvent')}</Button>
                </Stack>
              </Card>
            </Stack>}
          {!query.isPending && query.data &&
            <Stack>
              <Title c='var(--mantine-color-text-success)' order={2}>{t('search.foundTitle')}</Title>
              <Text fw='600'>{t('search.foundInstruction')}</Text>
              <Button component={Link} to='https://digital.forms.sf.gov/t/ufxxkihxpFus'>{t('search.findCommunityEvent')}</Button>
            </Stack>}
        </Stack>
      </Container>
    </>
  );
}

export default Search;
