import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from '@/components/SessionProvider'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Noble Shipping - Global Logistics & Cargo Services',
  description: 'Professional shipping and logistics services worldwide. Track your cargo, aircargo, and parcels with real-time updates.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="no-js">
      <head>
        {/* CSS files loaded via link tags for Next.js compatibility */}
        {/* Public directory CSS files cannot be loaded via @import in Next.js */}

        {/* Bootstrap CSS */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />

        {/* Vendor CSS Files */}
        <link rel="stylesheet" href="/css/animate.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/fontawesome-all.min.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/slick.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/default.css" />

        {/* Main Style CSS */}
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />

        {/* Custom Master CSS */}
        <link rel="stylesheet" href="/css/master.css" />

        {/* Note: flask-alignment.css is imported in globals.css (last to ensure overrides work) */}
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}