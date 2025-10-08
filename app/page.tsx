import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoiceList from "@/components/InvoiceList";

export default function Page() {
  console.log("Page");

  return (
    <Container maxW="3xl" py={8}>
      <Stack spacing={6}>
        <Heading>Carbon Invoices Demo</Heading>
        <Text>Next.js 15 + MongoDB (Mongoose) + Chakra UI</Text>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <InvoiceForm />
        </Box>
        <InvoiceList />
      </Stack>
    </Container>
  );
}
