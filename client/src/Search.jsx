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
      const response = await fetch(`/api/largevehicles?search=${licensePlateNumber}`);
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
          {query.data?.length === 0 &&
            <Stack>
              <Title c='var(--mantine-color-text-danger)' order={2}>We couldn’t find your vehicle in the system</Title>
              <Text fw='600'>Please double-check the license plate number you entered.</Text>
              <Button component={Link} to='/'>Re-enter license plate</Button>
              <Card>
                <Stack>
                  <Text fw='600'>If the number is correct, you may still qualify — submit an appeal or talk to someone from our outreach team.</Text>
                  <Button component={Link} to='/'>Submit an appeal</Button>
                  <Button component={Link} to='/'>Find support team</Button>
                </Stack>
              </Card>
            </Stack>}
          {query.data?.length > 0 &&
            <Stack>
              <Title c='var(--mantine-color-text-success)' order={2}>Good news! Your vehicle is in the system</Title>
              <Text fw='600'>You may qualify for a Large Vehicle Permit. We’ll guide you through the next steps.</Text>
              <Button component={Link} to='/'>See next steps</Button>
            </Stack>}
        </Stack>
      </Container>
    </>
  );
}

export default Search;
