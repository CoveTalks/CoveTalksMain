# CoveTalks - Next.js Application

A modern speaker booking marketplace built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/covetalks-nextjs.git
cd covetalks-nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:
```env
# Supabase (Get from your Supabase project settings)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (Get from Stripe dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
covetalks-nextjs/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── speakers/          # Speaker listing and profiles
│   ├── opportunities/     # Speaking opportunities
│   ├── about/            # About page
│   ├── pricing/          # Pricing plans
│   ├── contact/          # Contact form
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, Card, etc.)
│   ├── layout/           # Layout components (Header, Footer)
│   └── features/         # Feature-specific components
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client setup
│   ├── stripe/           # Stripe configuration
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── images/           # Images
│   └── fonts/            # Custom fonts
└── styles/               # Global styles
```

## 🎨 Features Implemented

### Public Pages (No Auth Required)
- ✅ Landing page with hero, features, and testimonials
- ✅ Speakers listing with search and filters
- ✅ Speaking opportunities board
- ✅ About page with team and mission
- ✅ How it works guide
- ✅ Pricing plans comparison
- ✅ Contact form
- ✅ Privacy Policy
- ✅ Terms of Service

### Coming Soon (Auth Required)
- 🔄 User registration and login
- 🔄 Dashboard for speakers and organizations
- 🔄 Profile management
- 🔄 Application system
- 🔄 Messaging system
- 🔄 Payment processing
- 🔄 Reviews and ratings

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)

## 🗄️ Database Setup

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Save your project URL and keys

2. **Run database migrations**
   - Use the SQL scripts from the original repo's DATABASE.md
   - Set up tables for members, organizations, opportunities, etc.

3. **Enable Row Level Security (RLS)**
   - Important for data protection
   - Configure policies for each table

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Import to Vercel:
```bash
npx vercel
```

3. Configure environment variables in Vercel dashboard

4. Deploy!

### Alternative: Self-hosted

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📝 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Documentation: [docs.covetalks.com](https://docs.covetalks.com)
- Email: support@covetalks.com
- Issues: [GitHub Issues](https://github.com/yourusername/covetalks-nextjs/issues)

## 🙏 Acknowledgments

- Original CoveTalks team for the concept and design
- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- All contributors and supporters

---

Built with ❤️ by the CoveTalks Team
