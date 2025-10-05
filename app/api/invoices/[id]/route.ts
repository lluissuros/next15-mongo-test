import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Invoice } from '@/models/Invoice'

interface Params { params: { id: string } }

export async function DELETE(_: Request, { params }: Params) {
  await connectToDatabase()
  const { id } = params
  await Invoice.findByIdAndDelete(id)
  return NextResponse.json({ ok: true })
}
