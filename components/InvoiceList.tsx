'use client'
import useSWR from 'swr'
import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function InvoiceList() {
  const { data, isLoading, mutate } = useSWR('/api/invoices', fetcher)

  async function remove(id: string) {
    const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      alert('Delete failed')
      return
    }
    mutate()
  }

  if (isLoading) return <Spinner />
  if (!data?.items?.length) return <Text>No invoices yet.</Text>

  return (
    <Box>
      <Heading size="md" mb={2}>Invoices</Heading>
      {data.items.map((inv: any) => (
        <Flex key={inv._id} justify="space-between" align="center" borderWidth="1px" borderRadius="lg" p={3} mb={2}>
          <Box>
            <Text><b>Client:</b> {inv.clientId} — <b>Type:</b> {inv.type}</Text>
            <Text><b>Amount:</b> €{inv.amount} — <b>Date:</b> {new Date(inv.emissionDate).toLocaleDateString()}</Text>
            {inv.note && <Text color="gray.500">{inv.note}</Text>}
          </Box>
          <Button size="sm" onClick={()=>remove(inv._id)}>Delete</Button>
        </Flex>
      ))}
    </Box>
  )
}
