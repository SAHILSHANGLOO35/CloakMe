# Cloak Me

**Cloak Me** is a fully responsive, dark-themed anonymous content sharing platform. Users can express their thoughts, share images or GIFs — all without revealing their identity.

> *"Finally, a place to post without worrying about likes or judgment."*

---

## Why Cloak Me?

In today’s world of curated identities and social validation, Cloak Me offers a space for unfiltered expression. Whether you're feeling overwhelmed, want to vent, or just share a meme — this is your anonymous outlet.

No likes. No followers. No pressure. Just authentic expression.

---

## Live Demo

**🔗 [https://cloakme.zodx.tech](https://cloakme.zodx.tech)**

---

## Features

- Anonymous content posting (text, images, and GIFs)
- Mobile-first, fully responsive layout
- Clean, modern dark UI
- Real-time UX with instant feedback
- Ability to delete your own posts
- Image and GIF uploads via Supabase Storage
- No metrics or judgment — just pure expression

---

## Tech Stack

- **Frontend & Backend:** [Next.js (App Router)](https://nextjs.org/)
- **Database:** [Supabase PostgreSQL](https://supabase.com/)
- **Authentication:** [Clerk.dev](https://clerk.dev)
- **Storage:** Supabase Storage
- **Styling:** Tailwind CSS
- **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cloak-me.git
cd cloak-me
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Create .env.local

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Deployment Server

```bash
pnpm run dev
# or
npm run dev
```
