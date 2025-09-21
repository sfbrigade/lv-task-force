import { Container, Stack, Title, Text } from '@mantine/core';
import { useSearchParams } from 'react-router';
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
        <Title mb='lg'>Search</Title>
        <Stack>
          <Text>{licensePlateNumber}</Text>
          <Text>Found: {JSON.stringify(!!(query.data?.length ?? 0))}</Text>
          <Text>{JSON.stringify(query.data)}</Text>
        </Stack>
      </Container>
    </>
  );
}

export default Search;
