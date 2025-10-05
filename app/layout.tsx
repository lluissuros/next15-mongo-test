import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'next15-mongo-test',
  description: 'Next 14 + MongoDB + Chakra UI demo'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
