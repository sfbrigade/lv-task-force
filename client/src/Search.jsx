import { Container, Stack, Title, Text, Card, Button } from '@mantine/core';
import { useSearchParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Head } from '@unhead/react';

function Search () {
  const [searchParams] = useSearchParams();
  const licensePlateNumber = searchParams.get('licensePlateNumber')?.trim() ?? '';

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
        <title>Search</title>
      </Head>
      <Container>
        <Stack>
          <Text fw='600'><Text c='var(--mantine-color-text-secondary)' span>License plate:</Text> {licensePlateNumber.toUpperCase().trim()}</Text>
          {!query.isPending && !query.data &&
            <Stack>
              <Title c='var(--mantine-color-text-danger)' order={2}>We couldn’t find your vehicle in the system</Title>
              <Text fw='600'>Please double-check the license plate number you entered.</Text>
              <Button component={Link} to='/'>Re-enter license plate</Button>
              <Card>
                <Stack>
                  <Text fw='600'>If the number is correct, you may still qualify — submit an appeal or attend a Community Event for help.</Text>
                  <Button component={Link} to='https://digital.forms.sf.gov/t/vpMQz4c7Jmus'>Submit an Appeal</Button>
                  <Button variant='secondary' component={Link} to='https://media.api.sf.gov/documents/Large_Vehicle_Program_Community_Events_-_09.23.25_-_FINAL.pdf'>Find a Community Event</Button>
                </Stack>
              </Card>
            </Stack>}
          {!query.isPending && query.data &&
            <Stack>
              <Title c='var(--mantine-color-text-success)' order={2}>Good news! Your vehicle is in the system</Title>
              <Text fw='600'>You may qualify for a Large Vehicle Permit. Attend an upcoming Community Event to apply.</Text>
              <Button component={Link} to='https://media.api.sf.gov/documents/Large_Vehicle_Program_Community_Events_-_09.23.25_-_FINAL.pdf'>Find a Community Event</Button>
            </Stack>}
        </Stack>
      </Container>
    </>
  );
}

export default Search;
