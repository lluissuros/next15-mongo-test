"use client";
import { Button } from "@chakra-ui/react";
import { deleteInvoice } from "@/app/serveractions/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" type="submit" isLoading={pending}>
      Delete
    </Button>
  );
}

export default function DeleteInvoiceButton({
  invoiceId,
}: {
  invoiceId: string;
}) {
  return (
    <form action={deleteInvoice}>
      <input type="hidden" name="invoiceId" value={invoiceId} />
      <SubmitButton />
    </form>
  );
}
