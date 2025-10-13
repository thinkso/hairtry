# CodeBuddy Documentation

## Project Overview
HairTry is a Next.js-based AI hairstyle try-on application that allows users to upload photos, select hairstyles, and generate AI-powered hairstyle previews using Google Gemini 2.5 Flash Image Preview model.

## Development Commands

### Setup
```bash
npm install
# Set up environment variables in .env.local
```

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Testing
```bash
# Note: No test scripts are currently configured in package.json
# To add testing, consider installing Jest or Vitest and configuring test scripts
```

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: Google Gemini 2.5 Flash Image Preview
- **Database**: Supabase (for hairstyle data and usage logs)
- **Deployment**: Vercel

### Key Components

#### Core Application Flow
1. **Image Upload** - Local file processing with base64 conversion
2. **Hairstyle Selection** - Grid-based selection from Supabase data
3. **AI Generation** - Gemini model integration via API route
4. **Result Display** - Comparison slider and download functionality

#### API Routes
- `/api/generate` - Main AI generation endpoint that accepts:
  - `imageBase64`: User's uploaded photo
  - `hairstylePrompt`: Selected hairstyle description

#### Data Models
- **Hairstyles Table**: id, name, gender, thumbnail_url, prompt
- **Usage Logs Table**: timestamp, hairstyle_id, status, duration_ms

### Key Implementation Patterns

#### Image Handling
- All image processing happens locally in the browser
- No server-side image storage (privacy-focused)
- Base64 encoding for AI model input

#### AI Integration
- Google Generative AI SDK for model calls
- Environment-based API key configuration
- Error handling for API rate limits and failures

#### State Management
- Zustand for global state (uploaded image, selected hairstyle, generation results)
- React hooks for component-level state

### Environment Configuration
All sensitive configuration in `.env.local`:
- `GOOGLE_GEMINI_API_KEY` - Gemini API access
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### File Structure Patterns
- `app/` - Next.js App Router (contains layout.tsx, page.tsx)
- `components/` - React components (Header, ImageUpload, HairstyleSelector, AIGenerator, ResultDisplay, Footer)
- `lib/` - Utility functions (supabase.ts, store.ts)
- `public/` - Static assets
- `api/` - API routes would be in app/api/ if implemented

### Key Considerations
- **Privacy**: No image storage on servers
- **Performance**: Optimized image handling and lazy loading
- **Error Handling**: Comprehensive error states for AI failures
- **Mobile Responsive**: Tailwind-based responsive design