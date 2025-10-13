"use client";
import {
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { createInvoice } from "@/app/serveractions/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      Add invoice With Server Action
    </Button>
  );
}

export default function InvoiceFormServerAction() {
  const panelBg = useColorModeValue("yellow.50", "yellow.700");

  return (
    <form action={createInvoice}>
      {/* will just call fucntion on the server */}
      <Box bg={panelBg} borderRadius="lg" p={4} boxShadow="sm" mt={4}>
        <Flex gap={3} wrap="wrap">
          <Input
            name="clientId"
            defaultValue="test-client-001"
            placeholder="Client ID"
          />
          <Input
            type="number"
            step="0.01"
            name="amount"
            defaultValue="100"
            placeholder="Amount"
          />
          <Input
            type="date"
            name="emissionDate"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
          <Select name="type" defaultValue="electricity">
            <option value="electricity">electricity</option>
            <option value="transport">transport</option>
            <option value="other">other</option>
          </Select>
          <Textarea name="note" placeholder="Note (optional)" />
          <SubmitButton />
        </Flex>
      </Box>
    </form>
  );
}
