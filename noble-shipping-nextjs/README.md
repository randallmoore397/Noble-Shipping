# Noble Shipping & Security Services

A comprehensive shipping and logistics management system built with Next.js, TypeScript, and Prisma. This application is a modern migration of a legacy Flask application, maintaining feature parity while leveraging the Next.js ecosystem.

## Features

- **Public Tracking**: Real-time tracking for Container, Aircargo, and Parcel shipments
- **Admin Dashboard**: Complete CRUD operations for all shipment types
- **User Management**: Role-based access control (Admin/Staff)
- **Authentication**: Secure login with NextAuth.js
- **Database**: SQLite Cloud with Prisma ORM and libSQL adapter
- **Email Notifications**: Automated emails for quotes, contact forms, and user management
- **Auto-Generation**: Automatic generation of tracking numbers, barcodes, flight numbers, and airway bills
- **Responsive Design**: Bootstrap-based UI with legacy jQuery plugin integration

## Backend Architecture

The backend is built using Next.js API Routes (App Router) and Prisma ORM. It is designed to align with the original Flask backend's logic and data structures.

### Key Components

- **API Routes**: Located in `src/app/api/`, handling all client requests
- **Prisma ORM**: Type-safe database access (`src/lib/prisma.ts`)
- **Authentication**: NextAuth.js configuration (`src/lib/auth.ts`)
- **Validation**: Zod schemas matching Python forms (`src/lib/validations.ts`)
- **Utilities**: Helper functions for generation and formatting (`src/lib/utils.ts`)
- **Email Service**: Nodemailer integration (`src/lib/email.ts`)

### API Endpoints

#### Public
- `GET /api/tracking/container/[number]`: Track container shipments
- `GET /api/tracking/aircargo/[number]`: Track air cargo shipments
- `GET /api/tracking/parcel/[number]`: Track parcels
- `POST /api/quotes`: Request a shipping quote (triggers email)
- `POST /api/contact`: Submit contact form (triggers email)

#### Admin (Protected)
- `POST /api/admin/container/create`: Create container shipment
- `POST /api/admin/aircargo/create`: Create air cargo (auto-generates flight/AWB)
- `PUT /api/admin/[type]/[id]/edit`: Update shipment (auto-creates history)
- `POST /api/admin/users/create`: Create new staff/admin users
- `GET /api/admin/dashboard/stats`: Dashboard statistics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd noble-shipping-nextjs
```

2. Install dependencies
```bash
npm install
```

## Database Configuration

The application uses SQLite Cloud hosted database with libSQL adapter for both development and production. The connection string format includes the embedded API key:

```
sqlitecloud://host:port/database_name.db?apikey=YOUR_API_KEY
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

The SQLite Cloud connection is configured in `.env` file. Edit `.env.local` for other settings:
```env
# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

4. Set up the database
```bash
npm run db:generate
npm run db:seed
```

Note: The seed script only creates admin user and roles. Real cargo data is available from the SQLite Cloud database. No dummy data is used in the application.

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

Default admin credentials (after seeding):
- **Email**: admin@nobleshipping.com
- **Password**: admin123

## Migration from Flask

This project replicates the Flask backend's functionality:

- **Data Models**: Prisma schema matches SQLAlchemy models
- **Business Logic**: Python utility functions ported to TypeScript (`src/lib/utils.ts`)
- **Validation**: WTForms logic ported to Zod schemas
- **Templates**: Jinja2 templates converted to React components

### Key Differences
- **Stripe**: Payment integration is now implemented with webhook support
- **Frontend**: React components replace server-side rendered templates
- **API**: RESTful API routes replace Flask views

## Stripe Payment Integration

The application includes Stripe payment processing for shipment payments.

### Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add keys to `.env.local`:
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Webhook Configuration

1. Install Stripe CLI: `stripe login`
2. Forward webhooks to local: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
3. Copy the webhook secret to `.env.local`

### Payment Flow

1. Client creates payment intent: `POST /api/stripe/create-payment-intent`
2. Client completes payment using Stripe.js
3. Stripe sends webhook to: `POST /api/stripe/webhook`
4. System updates payment status and sends confirmation email

## Email Configuration

The application uses Nodemailer for sending emails. Configure SMTP settings in `.env.local`:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM_EMAIL="noreply@nobleshipping.com"
SMTP_FROM_NAME="Noble Shipping Company"
```

### Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the App Password as `SMTP_PASSWORD`

### Email Notifications

- **Quote Requests**: Sent to admin when users request quotes
- **Contact Forms**: Sent to admin when users submit contact forms
- **Welcome Emails**: Sent to new users when accounts are created
- **Password Resets**: Sent when users reset passwords
- **Payment Confirmations**: Sent when payments are successful

## Authentication & Authorization

The application uses NextAuth.js with role-based access control.

### Roles

- **Admin**: Full access to all features
- **Staff**: Access to cargo management and tracking
- **Client**: (Future) Limited access for customers

### Protected Routes

All admin routes require authentication and specific roles:

```typescript
// Require authentication
await requireAuth()

// Require specific role(s)
await requireRole(['Admin', 'Staff'])

// Require admin only
await requireAdmin()
```

### Session Management

- Sessions are stored in the database
- Login tracking includes timestamp, IP address, and count
- Inactive users cannot access protected routes

## Database Schema

The Prisma schema includes the following models:

- **User**: User accounts with email, password, and roles
- **Role**: User roles (Admin, Staff, Client)
- **Staff**: Staff profile information
- **Cargo**: Container shipments
- **Aircargo**: Air cargo shipments
- **Parcel**: Parcel shipments
- **CargoStatusHistory**: Container tracking history
- **AircargoStatusHistory**: Air cargo tracking history
- **ParcelStatusHistory**: Parcel tracking history
- **RequestQuote**: Quote requests from customers
- **GetInTouch**: Contact form submissions
- **Carrier**: Shipping carriers

### Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with default data
npm run db:seed
```

## Utility Functions

### Auto-Generation

- **Tracking Numbers**: `generateTrackingNumber()` - Format: ABC123456XY
- **Barcodes**: `generateBarcode()` - EAN13 format
- **Flight Numbers**: `generateFlightNumber(airline)` - Format: XX-1234
- **Airway Bills**: `generateAirwayBillNumber(carrier)` - Format: XXX-12345678
- **User IDs**: `generateUserId(role)` - Format: SUP-MAX001 or STF-00001

### Validation

- **Tracking Numbers**: `validateTrackingNumber(number)` - Validates format
- **Zod Schemas**: Comprehensive validation for all API inputs

## Troubleshooting

### Database Issues

```bash
# Regenerate Prisma client and push schema
npm run db:generate
npm run db:push
npm run db:seed
```

### Email Not Sending

- Check SMTP credentials in `.env.local`
- Verify Gmail App Password is correct
- Check console for error messages
- In development, emails are logged to console

### Stripe Webhook Errors

- Ensure webhook secret matches Stripe CLI output
- Verify webhook endpoint is accessible
- Check Stripe Dashboard for webhook delivery status

### Authentication Errors

- Clear browser cookies and local storage
- Verify `NEXTAUTH_SECRET` is set
- Check database for user records

## Development

### Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin pages
│   └── (public)/         # Public pages
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── auth-helpers.ts   # Authentication helpers
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Utility functions
│   ├── email.ts          # Email service
│   ├── stripe.ts         # Stripe integration
│   ├── validations.ts    # Zod schemas
│   └── constants.ts      # App constants
└── components/           # React components
```

### Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Environment Variables

Ensure all environment variables are set in production:

- `DATABASE_URL`: Production database connection string
- `NEXTAUTH_URL`: Production URL
- `NEXTAUTH_SECRET`: Strong random secret
- `SMTP_*`: Email configuration
- `STRIPE_*`: Stripe API keys
- `DEFAULT_ADMIN_*`: Default admin credentials

### Database

The application uses SQLite Cloud for both development and production environments with libSQL adapter. The connection string format with embedded API key:

```env
DATABASE_URL="sqlitecloud://host:port/database_name.db?apikey=YOUR_API_KEY"
```

The cloud database contains real cargo data from `Cargo_backup_November_24.db`. All dummy/fallback data has been removed from admin pages to ensure only real data is displayed.

### Data Fetching Architecture

The application uses two approaches for database access:

1. **Prisma ORM** (Primary): Type-safe database operations for most admin pages
2. **Direct SQLite Cloud Driver** (Alternative): Raw SQL queries via `@sqlitecloud/drivers` for specific use cases

### Database Utilities

The `src/lib/db-utils.ts` file provides helper functions for direct database access:

```typescript
import { executeQuery, getTableStats } from '@/lib/db-utils'

// Execute raw SQL queries
const results = await executeQuery<MyType>('SELECT * FROM table WHERE id = ?', [id])

// Get table statistics
const stats = await getTableStats()
```

### Error Handling

All admin pages now use proper error handling without dummy data fallbacks. Database connection issues will display user-friendly error messages using the `ErrorMessage` component.

### Troubleshooting Database Issues

If you encounter database connection problems:

1. Verify the SQLite Cloud connection string in `.env` file
2. Check that the API key is valid and has proper permissions
3. Ensure the database name `Cargo_backup_November_24.db` exists in your SQLite Cloud cluster
4. Review server logs for specific error messages
5. Test the connection using the direct SQLite Cloud driver utilities

## License

This project is proprietary software owned by Noble Shipping & Security Services.