import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Anchor, Card, Container, FocusTrap, Stack, Title, TextInput, Button, Text } from '@mantine/core';
import { Head } from '@unhead/react';
import { useTranslation } from 'react-i18next';

function Home () {
  const navigate = useNavigate();
  const [licensePlateNumber, setLicensePlateNumber] = useState('');
  const { t } = useTranslation();

  function onSubmit (event) {
    event.preventDefault();
    navigate(`/search?licensePlateNumber=${licensePlateNumber}`);
  }

  return (
    <>
      <Head>
        <title>{t('home.metaTitle')}</title>
      </Head>
      <Container>
        <Anchor href='https://sf.gov/LVprogram' mb='lg' fw='600' display='block'>{t('home.permitProgramLink')}</Anchor>
        <Card mb='md'>
          <form onSubmit={onSubmit}>
            <Stack>
              <Text fz='lg' fw='600'>{t('home.instructions')}</Text>
              <FocusTrap>
                <TextInput name='licensePlateNumber' placeholder={t('home.licensePlatePlaceholder')} value={licensePlateNumber} onChange={(e) => setLicensePlateNumber(e.target.value)} data-autofocus />
              </FocusTrap>
              <Button disabled={!licensePlateNumber} type='submit'>{t('home.checkVehicleButton')}</Button>
            </Stack>
          </form>
        </Card>
        <Text mb='xl' fz='sm' c='var(--mantine-color-text-secondary)'>{t('home.databaseNote')}</Text>
        <Title order={2}>{t('home.noPlateHeading')}</Title>
        <Stack>
          <Text fw='600'>{t('home.noPlateDescription')}</Text>
          <Button component={Link} to='https://digital.forms.sf.gov/t/fGktGkwBuKus'>{t('home.findCommunityEvent')}</Button>
        </Stack>
      </Container>
    </>
  );
}

export default Home;
