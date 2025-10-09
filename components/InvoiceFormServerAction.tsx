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
import { useActionState } from "react";

export default function InvoiceFormServerAction() {
  const panelBg = useColorModeValue("yellow.50", "yellow.700");
  const initialState = {
    // clientId: "client-001",
    // amount: "100",
    // emissionDate: new Date().toISOString().slice(0, 10),
    // type: "electricity" as const,
    // note: "",
    message: null,
  };
  const [state, formAction, pending] = useActionState(
    createInvoice,
    initialState
  );

  function SubmitButton() {
    return (
      <Button type="submit" isLoading={pending}>
        Add invoice With Server Action
      </Button>
    );
  }

  return (
    <form action={formAction}>
      {/* will just call fucntion on the server */}
      <Box bg={panelBg} borderRadius="lg" p={4} boxShadow="sm" mt={4}>
        <Flex gap={3} wrap="wrap">
          <Input
            name="clientId"
            // defaultValue={initialState.clientId}
            placeholder="Client ID"
          />
          <Input
            type="number"
            step="0.01"
            name="amount"
            // defaultValue={initialState.amount}
            placeholder="Amount"
          />
          <Input
            type="date"
            name="emissionDate"
            // defaultValue={initialState.emissionDate}
          />
          <Select name="type">
            <option value="electricity">electricity</option>
            <option value="transport">transport</option>
            <option value="other">other</option>
          </Select>
          <Textarea
            name="note"
            // defaultValue={initialState.note}
            placeholder="Note (optional)"
          />
          <SubmitButton />
        </Flex>
      </Box>
    </form>
  );
}
