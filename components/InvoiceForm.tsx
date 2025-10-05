'use client'
import { useState } from 'react'
import { Button, Flex, Input, Select, Textarea } from '@chakra-ui/react'
import {mutate} from 'swr'

export default function InvoiceForm() {
  const [clientId, setClientId] = useState('client-001')
  const [amount, setAmount] = useState('100')
  const [emissionDate, setEmissionDate] = useState(new Date().toISOString().slice(0,10))
  const [type, setType] = useState('electricity')
  const [note, setNote] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId, amount: Number(amount), emissionDate, type, note
        })
      })
      if (!res.ok) throw new Error('Failed to save')
      setNote('')
      await mutate('/api/invoices')
    } catch (err) {
      console.error(err)
      alert('Error saving invoice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={3} wrap="wrap">
        <Input value={clientId} onChange={e=>setClientId(e.target.value)} placeholder="Client ID" />
        <Input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <Input type="date" value={emissionDate} onChange={e=>setEmissionDate(e.target.value)} />
        <Select value={type} onChange={e=>setType(e.target.value)}>
          <option value="electricity">electricity</option>
          <option value="transport">transport</option>
          <option value="other">other</option>
        </Select>
        <Textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Note (optional)" />
        <Button type="submit" isLoading={loading}>Add invoice</Button>
      </Flex>
    </form>
  )
}
