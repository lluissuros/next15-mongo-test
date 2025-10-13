import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { connectToDatabase } from "@/lib/db";
import { Invoice, type InvoiceDoc } from "@/models/Invoice";
import DeleteInvoiceButton from "@/components/DeleteInvoiceButton";

interface InvoiceItem extends InvoiceDoc {
  _id: string;
}

export default async function InvoiceList() {
  await connectToDatabase();
  const invoices = (await Invoice.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .lean()) as unknown as InvoiceItem[];

  if (!invoices.length) {
    return <Text>No invoices yet.</Text>;
  }

  return (
    <Box>
      <Heading size="md" mb={2}>
        Invoices
      </Heading>
      {invoices.map((inv) => (
        <Flex
          key={inv._id.toString()}
          justify="space-between"
          align="center"
          borderWidth="1px"
          borderRadius="lg"
          p={3}
          mb={2}
        >
          <Box>
            <Text>
              <b>Client:</b> {inv.clientId} — <b>Type:</b> {inv.type}
            </Text>
            <Text>
              <b>Amount:</b> €{inv.amount} — <b>Date:</b>{" "}
              {new Date(inv.emissionDate).toLocaleDateString()}
            </Text>
            {inv.note && <Text color="gray.500">{inv.note}</Text>}
          </Box>
          <DeleteInvoiceButton invoiceId={inv._id.toString()} />
        </Flex>
      ))}
    </Box>
  );
}
