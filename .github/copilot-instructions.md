# Copilot Instructions for Gaya's Log

## Project Overview

**Gaya's Log** is a personal activity tracking application built with React + Vite that logs daily activities with labels, energy levels, and timestamps. It features both public and admin-gated views, dark mode support, and real-time activity synchronization via Supabase.

## Architecture

### Core Stack
- **Frontend**: React 19 + Vite 7 (Fast Refresh via @vitejs/plugin-react)
- **Backend**: Supabase (Authentication, PostgreSQL database, Real-time subscriptions)
- **Styling**: Tailwind CSS + custom CSS variables for dark/light mode
- **Icons**: lucide-react

### Key Data Model
The app centers on the `activities` table with fields:
- `activity_text`: Description of the activity
- `label`: Category (work, study, workout)
- `energy_level`: User's energy (high, medium, low)
- `resource_link`: Optional related resource URL
- `created_at`: Timestamp

### Views Architecture
Routes managed via `activeTab` state in [App.jsx](src/App.jsx):
- **HomeView**: Landing page with user bio and social links
- **TodayView**: Displays today's activities with real-time updates
- **ArchivesView**: Historical activity browsing
- **PomodoroView**: Pomodoro timer integration
- Admin site gated by `VITE_IS_ADMIN=true` environment variable

### Real-Time Pattern
[TodayView.jsx](src/components/TodayView.jsx) demonstrates the real-time subscription pattern:
```javascript
const channel = supabase
  .channel('activities-changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'activities' }, (payload) => {
    if (payload.eventType === 'INSERT') handleNewActivity(payload.new)
  })
  .subscribe()
```

## Critical Developer Workflows

### Setup
1. Create `.env` with Supabase credentials:
   ```
   VITE_SUPABASE_URL=<your_url>
   VITE_SUPABASE_ANON_KEY=<your_key>
   VITE_IS_ADMIN=true|false
   ```
2. `npm install` → `npm run dev` for local development (HMR enabled)

### Build & Deploy
- `npm run build`: Production bundle (SPA to `dist/`)
- `npm run preview`: Test production build locally
- `npm run lint`: ESLint check (config: [eslint.config.js](eslint.config.js))

### Database Queries
All Supabase calls use the `.from('activities')` pattern. Example from [ActivityForm.jsx](src/components/ActivityForm.jsx):
```javascript
const { data, error } = await supabase
  .from('activities')
  .insert([{ activity_text, label, energy_level, resource_link }])
  .select()
```

## Styling Conventions

### CSS Variables (Dark/Light Mode)
Defined in [index.css](src/index.css) as `:root` and `.dark` classes:
- `--bg`: Background color
- `--content-bg`: Card/container background
- `--text-primary`, `--text-secondary`: Text colors
- `--accent`, `--border`, `--hover`: UI elements

**Usage**: Use `className="text-[var(--text-primary)]"` for theme-aware styling. Dark mode toggled via `document.documentElement.classList.toggle('dark')` with localStorage persistence.

### Tailwind Setup
- Configured in [tailwind.config.js](tailwind.config.js) with `darkMode: 'class'`
- Responsive breakpoints: mobile-first, `md:` for medium screens and up
- Padding bottom (`pb-24`) on main div reserves space for mobile dock

## Component Patterns

### Form Components
[ActivityForm.jsx](src/components/ActivityForm.jsx) shows the standard pattern:
- Local state for form fields (`useState`)
- Submit handler validates and calls `supabase.from().insert()`
- Clears form on success, sets error state on failure
- Calls `onActivityAdded` callback to update parent

### List Components
[ActivityList.jsx](src/components/ActivityList.jsx): Maps activities array, renders with consistent card styling using CSS variables.

### Layout Components
- [Header.jsx](src/components/Header.jsx): Tab navigation, dark mode toggle, user auth status
- [BottomDock.jsx](src/components/BottomDock.jsx): Mobile navigation dock (fixed bottom, always visible)
- [Footer.jsx](src/components/Footer.jsx): Static footer with links

## Authentication Flow

[App.jsx](src/App.jsx) auth pattern:
1. On mount, check current user via `supabase.auth.getUser()` and subscribe to `onAuthStateChange`
2. On admin site (`IS_ADMIN=true`), show [LoginModal.jsx](src/components/LoginModal.jsx) if unauthenticated
3. Pass `user` and `onLogout` props down to components that need auth context

## Common Tasks

- **Add new activity label**: Update `LABELS` array in [ActivityForm.jsx](src/components/ActivityForm.jsx) and database schema
- **Add new view**: Create component in `src/components/`, add tab case in [App.jsx](src/App.jsx) render logic, add tab button in [Header.jsx](src/components/Header.jsx)
- **Theme adjustments**: Modify CSS variables in [index.css](src/index.css) `:root` or `.dark` sections
- **Icon usage**: Import from [Icons.jsx](src/components/Icons.jsx) or lucide-react directly

## Environment-Specific Behavior
- `VITE_IS_ADMIN=true`: Requires authentication, shows [LoginModal.jsx](src/components/LoginModal.jsx), restricts admin features
- Dark mode: Read from localStorage on mount, fallback to true (dark mode default)
