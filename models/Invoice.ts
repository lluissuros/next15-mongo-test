import { Schema, models, model } from "mongoose";

export type InvoiceType = "electricity" | "transport" | "other";

export interface InvoiceDoc {
  clientId: string;
  amount: number;
  emissionDate: Date;
  type: InvoiceType;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const InvoiceSchema = new Schema<InvoiceDoc>(
  {
    clientId: { type: String, required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    emissionDate: { type: Date, required: true },
    type: {
      type: String,
      enum: ["electricity", "transport", "other"],
      required: true,
    },
    note: { type: String },
  },
  { timestamps: true }
);

// Helpful index for listing by client & date
InvoiceSchema.index({ clientId: 1, emissionDate: -1 });

export const Invoice =
  models.Invoice || model<InvoiceDoc>("Invoice", InvoiceSchema);
