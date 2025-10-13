"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { Invoice } from "@/models/Invoice";

export async function createInvoice(formData: FormData) {
  //TODO: we could validate the form data here with Zod
  const payload = {
    clientId: String(formData.get("clientId") ?? ""),
    amount: Number(formData.get("amount") ?? 0),
    emissionDate: new Date(String(formData.get("emissionDate") ?? new Date())),
    type: String(formData.get("type") ?? "other") as
      | "electricity"
      | "transport"
      | "other",
    note: String(formData.get("note") ?? "") || undefined,
  };

  await connectToDatabase();
  await Invoice.create(payload);
  revalidatePath("/");
}

export async function deleteInvoice(formData: FormData) {
  const invoiceId = formData.get("invoiceId") as string;
  await connectToDatabase();
  await Invoice.findByIdAndDelete(invoiceId);
  revalidatePath("/");
}
