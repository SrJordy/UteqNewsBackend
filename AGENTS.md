# UTEQ News Backend - Agent Guidelines

## Build/Lint/Test Commands
- **Development**: `pnpm run dev` (tsx watch src/index.ts)
- **Build**: `pnpm run build` (compiles TypeScript + copies generated files)
- **Start**: `pnpm run start` (node dist/index.js)
- **No test framework configured** - add Jest/Vitest if needed

## Code Style Guidelines

### TypeScript
- Strict mode enabled (`"strict": true` in tsconfig.json)
- Target ES2022, NodeNext modules
- Use explicit types for FastifyRequest/Reply parameters

### Imports & Structure
- Import statements at top of files
- Group imports: external libs first, then internal modules
- Use relative paths for internal imports (`../services/`, `./controllers/`)

### Naming Conventions
- Controllers: `handleGet*`, `handlePost*`, `handlePut*`, `handleDelete*`
- Services: camelCase function names
- Files: kebab-case for routes/controllers, camelCase for services
- Variables: camelCase, PascalCase for types/interfaces

### Error Handling
- Use try-catch in all async functions
- Log errors with `console.error('Controller/Service Error:', error)`
- Return standardized error responses: `{ error: 'message' }`
- HTTP status codes: 200 success, 400 bad request, 404 not found, 500 server error

### Documentation
- JSDoc comments for all exported functions
- Spanish comments preferred (matches codebase)
- Describe parameters and return values

### Database
- Use Prisma Client for all database operations
- Generated client in `src/generated/client/`
- SQLite database (`dev.db`)

### AI Integration
- Uses OpenRouter API with RAG (vector search context)
- Responses in Spanish only
- Context retrieved from vector database (`vectors.db`)

### Security
- Passwords hashed with bcryptjs
- JWT tokens for authentication (check auth service)
- CORS enabled for all origins (development setting)