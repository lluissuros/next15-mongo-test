# Manglai Fullstack Starter

Next.js 15 (App Router) + TypeScript + MongoDB/Mongoose + Chakra UI.
Minimal CRUD for "Invoices" (clientId, amount, emissionDate, type, note).

## Quickstart

1) Install deps
```bash
npm i
# or: pnpm i / yarn
```

2) Configure MongoDB
- Create `.env.local` from `.env.example` and set your `MONGODB_URI`.
  - You can use MongoDB Atlas (free tier) or run Docker locally:
    ```bash
    docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=dev -e MONGO_INITDB_ROOT_PASSWORD=dev mongo:7
    # then: MONGODB_URI="mongodb://dev:dev@localhost:27017/?authSource=admin"
    ```

3) Run the dev server
```bash
npm run dev
# open http://localhost:3000
```

## Architecture

This project follows **Next.js 15 best practices** with a fully server-side architecture:

- **Server Components** - `InvoiceList` fetches data directly from MongoDB (no API routes needed)
- **Server Actions** - Form submissions (create/delete) use Server Actions with `revalidatePath()`
- **Minimal Client JS** - Only interactive UI elements are client components (`useFormStatus` for loading states)
- **No API Routes** - Direct database access in Server Components eliminates unnecessary HTTP overhead
- **Progressive Enhancement** - Forms work without JavaScript enabled

### Key Files

- `app/serveractions/actions.ts` - Server Actions for create/delete operations
- `components/InvoiceList.tsx` - Server Component with direct DB queries
- `components/InvoiceFormServerAction.tsx` - Client form using Server Actions
- `components/DeleteInvoiceButton.tsx` - Client button component
- `lib/db.ts` - Mongoose connection pooling to avoid multiple connections in dev
- `models/Invoice.ts` - Mongoose schema and TypeScript types

## Common Interview Talking Points

- **Why Server Components?** - Eliminates API routes for internal data, reduces client bundle, improves TTFB
- **Server Actions vs API Routes** - When to use each pattern (mutations vs external APIs)
- **Data Fetching Patterns** - Colocation of data dependencies with the UI that uses them
- **Progressive Enhancement** - Forms work without JS, `revalidatePath()` for cache invalidation
- **How to evolve this** - Auth (NextAuth), validation (Zod), pagination, aggregations, deployment on Vercel/Cloud Run
