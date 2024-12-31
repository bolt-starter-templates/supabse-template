# Supabase Auth Template

A modern authentication template built with Next.js 14, Supabase, and Shadcn/ui. This template provides a solid foundation for building applications that require user authentication and profile management.

![Shield Logo](https://lucide.dev/icons/shield) Built with security in mind.

## Features

- 🔐 **Authentication**
  - Email & Password Sign Up/Sign In
  - Password Reset Flow
  - Protected Routes
  - Persistent Sessions

- 👤 **User Management**
  - Profile Management (Display Name, Email, Phone)
  - Password Change
  - Account Deletion
  - User Metadata Storage

- 🎨 **Modern UI/UX**
  - Clean, Modern Interface
  - Dark/Light Mode
  - Responsive Design
  - Loading States
  - Error Handling
  - Toast Notifications

- 🛠 **Technical Stack**
  - Next.js 14
  - TypeScript
  - Supabase Auth
  - Shadcn/ui Components
  - Tailwind CSS
  - Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Supabase Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bolt-starter-templates/supabase-template.git
cd supabase-template
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                  # Next.js app directory
├── components/          
│   ├── ui/              # Reusable UI components
│   ├── auth-modals.tsx  # Authentication modals
│   ├── dashboard.tsx    # User dashboard
│   ├── header.tsx       # Application header
│   ├── landing-page.tsx # Public landing page
│   └── settings-modal.tsx # User settings
├── lib/
│   ├── supabase.ts     # Supabase client configuration
│   └── utils.ts        # Utility functions
└── public/             # Static files
```

## Configuration

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Go to Project Settings > API
3. Copy the `Project URL` and `anon` public API key
4. Update your `.env.local` file with these values

### Authentication Settings

The template comes with email/password authentication enabled by default. To enable additional providers:

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable and configure desired providers
3. Update the auth UI components accordingly

## Customization

### Styling

- The template uses Tailwind CSS for styling
- Theme customization can be done in `tailwind.config.ts`
- Component styling can be modified in `components/ui/`

### Components

All UI components are built using [shadcn/ui](https://ui.shadcn.com/), making them easy to customize and extend.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
