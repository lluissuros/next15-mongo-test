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

## What to Explore

- `app/` folder uses the App Router.
- API routes: `app/api/invoices/...` with NextResponse.
- Mongoose connection pooling in `lib/db.ts` to avoid multiple connections in dev.
- Chakra UI Provider in `app/providers.tsx` and components for UI.
- SWR for client-side data fetching + optimistic revalidation.

## Common Interview Talking Points

- Why App Router + RSC improves TTFB and simplifies data fetching.
- Aggregations in Mongo for reporting (e.g., totals per client or per month).
- How you'd evolve this: auth (NextAuth), pagination, validation (Zod), server actions, Cloud Run on GCP.
