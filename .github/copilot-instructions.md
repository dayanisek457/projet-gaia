# Projet Gaia - Lycée Saint Joseph Dijon

This is a React + TypeScript + Vite web application for Lycée Saint Joseph Dijon. The project uses Supabase as the backend and includes an admin interface with various features including roadmap management, documentation, task board, sponsors management, and a gallery system.

## Code Standards

### Required Before Each Commit
- Run `npm run lint` to ensure code quality and catch potential issues
- Ensure all TypeScript code follows existing patterns in the codebase
- Test your changes manually in the browser before committing

### Development Flow
- **Development server**: `npm run dev` (starts Vite dev server on port 8080)
- **Build**: `npm run build` (production build)
- **Build (dev mode)**: `npm run build:dev` (development mode build)
- **Lint**: `npm run lint` (runs ESLint)
- **Preview**: `npm run preview` (preview production build)

### Package Manager
- This project uses `npm` with `package-lock.json`
- Always use `npm install` to add dependencies
- Run `npm install` after pulling changes to ensure dependencies are up to date

## Repository Structure

- `src/`: Main source code
  - `components/`: Reusable React components (UI components from shadcn/ui)
  - `pages/`: Route components (Index, Admin, Documentation, Roadmap, etc.)
  - `hooks/`: Custom React hooks (including `useAutosave` for auto-saving functionality)
  - `lib/`: Core utilities and services (Supabase client, autosave service, etc.)
  - `utils/`: Utility functions
- `public/`: Static assets
- `supabase/`: Supabase configuration and migrations
- `.env.example`: Example environment variables file
- `index.html`: Entry HTML file
- `vite.config.ts`: Vite configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

## Key Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Library**: shadcn/ui (Radix UI primitives with Tailwind CSS)
- **Styling**: Tailwind CSS with custom configuration
- **Backend**: Supabase (PostgreSQL database with Row Level Security)
- **Routing**: React Router DOM
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Key Guidelines

### 1. Language and Internationalization
- **French is the primary language** for this application
- All user-facing text should be in French
- Text inputs must have `lang="fr"` and `spellCheck="true"` attributes for French spell checking
- This applies to: `Input`, `Textarea`, and `RichTextEditor` components

### 2. Autosave Feature
- The application includes an autosave system for admin forms
- Uses the `useAutosave` hook from `src/hooks/useAutosave.ts`
- Saves data every 15 seconds to prevent data loss
- Always call `clearAutosave()` after successfully saving data
- Autosave is used in: Roadmap, Documentation, TaskBoard, and Sponsors sections
- See `AUTOSAVE_DOCUMENTATION.md` for detailed information

### 3. Code Style
- Use TypeScript for all new code
- Follow existing component patterns (functional components with hooks)
- Use Tailwind CSS classes for styling
- Prefer composition over inheritance
- Keep components focused and single-purpose
- Use path aliases: `@/` points to `src/`

### 4. Database and Backend
- All database operations go through Supabase client (`src/lib/supabase.ts`)
- Row Level Security (RLS) is enabled - ensure queries respect user permissions
- Database migrations are in `supabase/migrations/`
- Never hardcode sensitive data or credentials

### 5. UI Components
- Use shadcn/ui components from `src/components/ui/`
- Follow existing component usage patterns
- Maintain consistent styling with the rest of the application
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes

### 6. Forms and Validation
- Use React Hook Form with Zod for form validation
- Follow existing form patterns in admin sections
- Include proper error handling and user feedback (toasts)

### 7. Admin Interface
- Admin routes are protected (check `src/pages/Admin.tsx`)
- Admin features include: Roadmap, Documentation, TaskBoard, Sponsors, Gallery management
- Always test admin features with proper authentication

### 8. Testing
- This project currently does not have automated tests
- Manually test all changes in the browser
- Test both user-facing pages and admin interface
- Verify French language support and spell checking

## Important Files

- `AUTOSAVE_DOCUMENTATION.md`: Detailed documentation on the autosave feature
- `TESTING_GUIDE.md`: Manual testing guide for autosave and French language features
- `GALLERY_SETUP.md`: Documentation for the gallery system
- `SPONSORS_SETUP.md`: Documentation for sponsors management
- `ROADMAP_ORDERING_GUIDE.md`: Guide for roadmap item ordering
- `VISUAL_GUIDE.md`: Visual guide for the project

## Environment Setup

1. Copy `.env.example` to `.env` and fill in the required values:
   - Supabase URL and anon key
   - AWS S3 credentials (for gallery uploads)
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Access the application at `http://localhost:8080`

## Common Tasks

### Adding a New Page
1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Ensure French language support for all text

### Adding a New Component
1. Create the component in `src/components/`
2. Use TypeScript for type safety
3. Follow existing component patterns
4. Use Tailwind CSS for styling

### Modifying Database Schema
1. Create a new migration file in `supabase/migrations/`
2. Use descriptive names for migration files
3. Test migrations in a development environment first
4. Document any new tables or significant schema changes

### Working with Forms
1. Use React Hook Form with Zod validation
2. Implement autosave if the form is in the admin interface
3. Provide clear error messages in French
4. Include proper success feedback (toasts)

## Best Practices

1. **Keep changes minimal**: Make the smallest possible changes to achieve the goal
2. **Test manually**: Always test in the browser before committing
3. **Follow existing patterns**: Look at similar code in the codebase for guidance
4. **French first**: Remember that French is the primary language
5. **Security**: Respect RLS policies and never expose sensitive data
6. **Documentation**: Update relevant documentation files when making significant changes
7. **Accessibility**: Maintain accessibility standards in UI components
8. **Performance**: Be mindful of bundle size and unnecessary re-renders

## Troubleshooting

- If build fails, check TypeScript errors: look for type mismatches
- If Supabase queries fail, verify RLS policies and authentication
- For styling issues, check Tailwind configuration and class names
- If autosave doesn't work, verify the hook is properly configured and enabled
- For French spell checking issues, ensure `lang="fr"` attribute is present

## Support Resources

- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- Supabase Documentation: https://supabase.com/docs
- shadcn/ui Documentation: https://ui.shadcn.com/
- Tailwind CSS Documentation: https://tailwindcss.com/docs
