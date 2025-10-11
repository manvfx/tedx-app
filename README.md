# TEDx Personality Quiz Application

A Persian personality assessment web application based on 10 mythological Iranian archetypes with 60 questions using a Likert scale scoring system.

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Radix UI** - UI primitives
- **React Hook Form** + **Zod** - Form validation
- **Framer Motion** - Animations
- **shadcn/ui** - Component library

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env file with your API URLs
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL_DEV` | Development API URL | `http://localhost:8005` |
| `VITE_API_BASE_URL_PROD` | Production API URL | `https://api.yourdomain.com` |
| `VITE_APP_NAME` | Application name | `TEDx Personality Test` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

**Note:** All environment variables must be prefixed with `VITE_` to be exposed to the client.

See `.env.example` for a complete template.

## Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

The application will run on **http://localhost:5173** (or the next available port).

## Project Structure

```
tedx-app/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   ├── Welcome.tsx  # Welcome form component
│   │   ├── Quiz.tsx     # Quiz component
│   │   └── Results.tsx  # Results component
│   ├── config/          # Configuration files
│   │   └── api.ts       # API configuration and helpers
│   ├── data/            # Static data and quiz questions
│   ├── lib/             # Utility libraries
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

## Features

- 🌍 **Bilingual Support** - Persian (RTL) and English
- 🌙 **Dark Theme** - Dark mode enabled by default
- 📱 **Responsive Design** - Mobile-first approach
- ✨ **Smooth Animations** - Framer Motion transitions
- 💾 **Progress Saving** - LocalStorage integration
- 🔒 **Form Validation** - Client-side and server-side validation
- 🎨 **Modern UI** - Beautiful components with Radix UI and Tailwind

## API Integration

The application connects to a backend API for storing user submissions. The API base URL is configured via environment variables:

- **Development:** `http://localhost:8005`
- **Production:** Set via `VITE_API_BASE_URL_PROD`

See `src/config/api.ts` for API endpoint definitions and helper functions.

## Development

### Adding Components

UI components are based on shadcn/ui and can be found in `src/components/ui/`. When adding new features:

1. Use existing components from `src/components/ui/`
2. Follow established component patterns
3. Maintain consistent styling with Tailwind classes
4. Use utility functions from `lib/utils.ts`

### Environment Variables in Code

Access environment variables using `import.meta.env`:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL_DEV;
const appName = import.meta.env.VITE_APP_NAME;
```

TypeScript types for environment variables are defined in `src/vite-env.d.ts`.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## License

ISC

## Project Information

For more details about the project architecture and specifications, see `../tedx-quiz-app.md` and `../CLAUDE.md`.
