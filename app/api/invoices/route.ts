import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Invoice } from '@/models/Invoice'

export async function GET() {
  await connectToDatabase()
  const items = await Invoice.find({}).sort({ createdAt: -1 }).limit(100).lean()
  return NextResponse.json({ items })
}

export async function POST(req: Request) {
  const body = await req.json()
  await connectToDatabase()
  const created = await Invoice.create({
    clientId: body.clientId,
    amount: body.amount,
    emissionDate: body.emissionDate,
    type: body.type,
    note: body.note
  })
  return NextResponse.json({ item: created }, { status: 201 })
}
