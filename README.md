This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# StyleLoop

StyleLoop is a full-stack fashion social MVP. It includes account registration and login, protected profile editing, a community feed, likes and comments APIs, product listings, cart and order APIs, and an AI-style quiz.

## Run locally

```bash
npm run dev
```

1. Create a Supabase project.
2. In its SQL Editor, run [the migration](supabase/migrations/202607260001_styleloop.sql).
3. Copy `.env.example` to `.env.local` and add the project URL and **service-role** key.

All accounts, social activity, carts, and orders are now persisted in Supabase PostgreSQL. Passwords are salted and hashed; sessions are stored in HTTP-only cookies. The service-role key is only read on the Next.js server and must never use the `NEXT_PUBLIC_` prefix.

## Production integrations

The checkout and AI stylist are deliberately safe MVP implementations: checkout creates a demo order and style advice uses a deterministic recommendation. Before accepting real payments, route checkout through Stripe or Razorpay webhooks and connect the AI endpoint to the provider of your choice.
