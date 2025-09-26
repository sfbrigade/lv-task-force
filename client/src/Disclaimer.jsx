import { Container, Text, Title } from '@mantine/core';
import { Head } from '@unhead/react';

function Disclaimer () {
  return (
    <>
      <Head>
        <title>Disclaimer</title>
      </Head>
      <Container>
        <Title order={1} mb='lg'>Disclaimer</Title>
        <Title order={2}>Terms of use, liability and browser compatibility.</Title>
        <Text>Information presented on this website is collected, maintained, and provided for the convenience of the reader. While every effort is made to keep the information accurate, we do not certify the authenticity of information that originates from third parties.</Text>
        <Title order={3} mt='md'>Liability</Title>
        <Text>Under no circumstances shall SF Civic Tech be liable for any actions taken or omissions made from reliance on any information contained herein from whatever source nor shall SF Civic Tech be liable for any other consequences from any such reliance.</Text>
        <Title order={3} mt='md'>Browser compatibility</Title>
        <Text>SF Civic Tech supports the latest versions of Internet Explorer, Firefox, Chrome, and Safari in standard view, as well as Safari and Chrome for mobile.</Text>
      </Container>
    </>
  );
}

export default Disclaimer;
