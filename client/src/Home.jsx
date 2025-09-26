import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Anchor, Card, Container, FocusTrap, Stack, Title, TextInput, Button, Text } from '@mantine/core';
import { Head } from '@unhead/react';

function Home () {
  const navigate = useNavigate();
  const [licensePlateNumber, setLicensePlateNumber] = useState('');

  function onSubmit (event) {
    event.preventDefault();
    navigate(`/search?licensePlateNumber=${licensePlateNumber}`);
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Anchor href='https://sf.gov/LVprogram' mb='lg' fw='600' display='block'>To Permit Program Site &rarr;</Anchor>
        <Title order={1} mb='lg'>Is your vehicle in the permit system?</Title>
        <Card mb='md'>
          <form onSubmit={onSubmit}>
            <Stack>
              <Text fz='lg' fw='600'>Enter your license plate number to see if you qualify for a permit.</Text>
              <FocusTrap>
                <TextInput name='licensePlateNumber' placeholder='e.g. 1ABC234' value={licensePlateNumber} onChange={(e) => setLicensePlateNumber(e.target.value)} data-autofocus />
              </FocusTrap>
              <Button disabled={!licensePlateNumber} type='submit'>Check Vehicle</Button>
            </Stack>
          </form>
        </Card>
        <Text mb='xl' fz='sm' c='var(--mantine-color-text-secondary)'>This tool lets you check if your vehicle was recorded in the City’s Large Vehicle database as of May 31, 2025.</Text>
        <Title order={2}>Don’t have a license plate?</Title>
        <Stack>
          <Text fw='600'>If you don’t have a plate, or don’t know what to enter, attend a Community Event for help.</Text>
          <Button component={Link} to='https://media.api.sf.gov/documents/Large_Vehicle_Program_Community_Events_-_09.23.25_-_FINAL.pdf'>Find a Community Event</Button>
        </Stack>
      </Container>
    </>
  );
}

export default Home;
