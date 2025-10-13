import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import InvoiceList from "@/components/InvoiceList";
import InvoiceFormServerAction from "@/components/InvoiceFormServerAction";

export default function Page() {
  return (
    <Container maxW="3xl" py={8}>
      <Stack spacing={6}>
        <Heading>Carbon Invoices Demo</Heading>
        <Text>Next.js 15 + MongoDB (Mongoose) + Chakra UI</Text>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <InvoiceFormServerAction />
        </Box>
        <InvoiceList />
      </Stack>
    </Container>
  );
}
