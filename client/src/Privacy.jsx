import { Container, Text, Title } from '@mantine/core';
import { Head } from '@unhead/react';

function Privacy () {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <Container>
        <Title order={1}>Privacy Policy</Title>
        <Text mb='lg'>Outlines the types of information we gather when you visit this site, and the steps we take to safeguard it.</Text>
        <Title order={2}>General policy</Title>
        <Title order={3} mt='md'>Information collection</Title>
        <Text mb='sm'>We do not collect personal information about you when you visit our website.</Text>
        <Text mb='sm'>We collect limited non-personally identifying information your browser makes available automatically whenever you visit a website. This information includes the Internet Address of your computer or network, the date, time, and page you visited on our site, your browser and operating system, and the referring page (the last webpage you visited before clicking on a link to our site).</Text>
        <Text mb='sm'>We use this aggregated anonymized information from all of our visitors to measure server performance and improve the content of our site.</Text>
        <Title order={3} mt='md'>Information you provide</Title>
        <Text mb='sm'>When you fill out a form, the information you submit will be used in the context of that form.</Text>
        <Text mb='sm'>We implement reasonable security measures to protect your information. However, no data transmission over the internet is 100% secure, and we cannot guarantee absolute security.</Text>
        <Text mb='sm'>We do not give, share, sell, rent or transfer any personal information to a third party.</Text>
        <Title order={3} mt='md'>Site analytics</Title>
        <Text mb='sm'>We use a tool called "PostHog" to help understand how visitors interact with our website so that we can improve the website. We do not collect personal information using PostHog. No cookies are used by PostHog.</Text>
        <Title order={3} mt='md'>Links</Title>
        <Text mb='sm'>Our website contains links to third-party sites. We are not responsible for their privacy practices and encourage you to review their policies.</Text>
        <Title order={3} mt='md'>Site security</Title>
        <Text mb='sm'>We monitor network traffic to identify unauthorized attempts to upload or change information or to otherwise cause damage to the site. Anyone using this website expressly consents to such monitoring.</Text>
        <Text mb='sm'>We take appropriate security measures to protect unauthorized access, alteration or destruction of data.</Text>
        <Title order={3} mt='md'>Policy changes</Title>
        <Text mb='sm'>We may update this Privacy Policy from time to time. We expect most such changes to be minor, but we will post those changes as they occur.</Text>
      </Container>
    </>
  );
}

export default Privacy;
