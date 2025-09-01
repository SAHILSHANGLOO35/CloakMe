# Contributing to Cloak Me

Thank you for your interest in contributing to **Cloak Me** — an anonymous, judgment-free platform for sharing thoughts, images, and memes.

We welcome contributions of all kinds, from bug fixes and feature improvements to documentation enhancements and UI tweaks.

---

## 🚀 **Getting Started**

### **1. Fork the Repository**  
Click on the **Fork** button at the top right of the [main repository](https://github.com/SAHILSHANGLOO35/CloakMe) page to create your own copy.

### **2. Clone Your Fork**  
Use the following commands to clone your fork locally:

```bash
git clone https://github.com/your-username/CloakMe.git
cd CloakMe
```

### **3. Install Dependencies**  
We use `pnpm`, but `npm` works too:

```bash
pnpm install
# or
npm install
```

### **4. Configure Environment Variables**  
Create a `.env.local` file in the root directory and add the following:

```env
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

> ⚠️ **Important:** Do **not** commit this file or expose your API keys.

### **5. Start the Dev Server**  
Run the following command to start the development server:

```bash
pnpm run dev
# or
npm run dev
```

The app should now be running at [http://localhost:3000](http://localhost:3000)

---

## 🛠 **What You Can Work On**

- 🐛 **Bug Fixes** — Spot something broken or glitchy? Fix it!
- ✨ **Features** — Suggest or add a new feature.
- 🎨 **UI Improvements** — Enhance responsiveness or visual design.
- 🧪 **Testing** — Add or improve test coverage.
- 📖 **Documentation** — Improve setup guides, code comments, or UI text.

---

## 🧾 **Contribution Guidelines**

- Follow clean code principles and use consistent naming conventions.
- Stick to the existing tech stack:
  - **Next.js (App Router)**
  - **Supabase**
  - **Clerk.dev**
  - **Tailwind CSS**
- Make small, atomic commits with clear messages.
- Open a pull request with a meaningful title and description.
- If you want to work on a new feature, open an issue or comment on an existing one before starting — to avoid duplicate efforts.

---

## 📦 **Tech Stack Overview**

- **Frontend & Backend**: Next.js (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage + Cloudinary for image uploads
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

---

## 💬 **Need Help?**

Open an issue or start a discussion in the [Issues](https://github.com/SAHILSHANGLOO35/CloakMe/issues) section. We're here to help!

---

Thanks for contributing!   
— **Team Cloak Me**
