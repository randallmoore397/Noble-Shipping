# Setup Instructions for Noble Shipping Next.js App

## Database Configuration

The application uses SQLite Cloud, a cloud-hosted SQLite database service that provides the simplicity of SQLite with the benefits of cloud infrastructure.

### Connection String Format

The SQLite Cloud connection string follows this format:
```
sqlitecloud://[host]:[port]/[database_name]?apikey=[api_key]
```

Components:
- **Protocol**: `sqlitecloud://`
- **Host and port**: `czfztvaivz.g4.sqlite.cloud:8860`
- **Database name**: `Cargo_backup_November_24.db`
- **API key**: Provided as a query parameter for authentication

### Environment Setup

1. Create a `.env` file from `.env.example` if it doesn't exist:
```bash
cp .env.example .env
```

2. Add the DATABASE_URL to your `.env` file:
```env
DATABASE_URL="sqlitecloud://czfztvaivz.g4.sqlite.cloud:8860/Cargo_backup_November_24.db?apikey=CIMDXeITdftbo6RP4ZwtmB8LRh5TxgaXvH5oD03hWf4"
```

### Benefits of SQLite Cloud

- **No local database setup required**: No need to install or configure local SQLite files
- **Automatic backups**: Cloud-hosted with built-in backup and recovery
- **Cloud accessibility**: Database accessible from anywhere with proper credentials
- **Scalability**: Handles multiple concurrent connections better than local SQLite
- **Consistency**: Same database for development, staging, and production environments

## Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma Client:
```bash
npm run db:generate
```

3. Run the development server:
```bash
npm run dev
```

## Changes Made

### Database Connection
- Updated `.env` with SQLite Cloud connection string
- Refactored `src/lib/prisma.ts` to use environment variables instead of hardcoded credentials
- Added proper connection string parsing for SQLite Cloud format
- Implemented error handling for missing or invalid DATABASE_URL
- Added `@prisma/adapter-libsql` and `@libsql/client` dependencies

### Dashboard Alignment
- Updated dashboard page to match Flask version layout
- Added `BudgetChart` component with ECharts radar chart
- Added `TrafficChart` component with ECharts pie chart
- Fixed AdminLayout styling to match Flask version
- Updated logo and profile image paths

### Styling Fixes
- Fixed header logo to use `/niceadmin/img/logo.png`
- Fixed profile image styling with inline width
- Updated message avatar images to use NiceAdmin assets
- Maintained consistent Bootstrap classes with Flask version

## Notes

- The dashboard now displays the same cards, charts, and layout as the Flask version
- All data is loaded from the SQLite Cloud database
- Charts use ECharts library (same as Flask version)
