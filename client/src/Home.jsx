import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, Container, FocusTrap, Stack, Title, TextInput, Button, Text } from '@mantine/core';
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
          <Text fw='600'>If you don’t have a plate, or don’t know what to enter, contact a support team for help.</Text>
          <Button component={Link} to='/'>Find support team</Button>
        </Stack>
      </Container>
    </>
  );
}

export default Home;
