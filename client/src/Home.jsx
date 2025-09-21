import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Stack, Title, TextInput, Button } from '@mantine/core';
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
        <Title mb='lg'>Home</Title>
        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput label='License Plate Number' name='licensePlateNumber' value={licensePlateNumber} onChange={(e) => setLicensePlateNumber(e.target.value)} />
            <Button type='submit'>Search</Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default Home;
