import QRCode from 'qrcode'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Get status color for badges
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    delivered: 'bg-green-100 text-green-800',
    'in transit': 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    'returned to sender': 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
  }
  return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`
}

/**
 * Validate tracking number format
 * Must match pattern: 3 uppercase letters + 6 digits + 2 uppercase letters
 * Example: ABC123456XY
 */
export function validateTrackingNumber(trackingNumber: string): boolean {
  if (!trackingNumber || trackingNumber.length !== 11) {
    return false
  }

  // Pattern: ^[A-Z]{3}\d{6}[A-Z]{2}$
  const pattern = /^[A-Z]{3}\d{6}[A-Z]{2}$/
  return pattern.test(trackingNumber)
}

/**
 * Generate QR code as base64 data URL
 */
export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    return qrCodeDataUrl
  } catch (error) {
    console.error('QR Code generation error:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Generate flight number based on airline
 * Format: XX-NNNN (e.g., EK-1234 for Emirates)
 */
export function generateFlightNumber(airline: string): string {
  // Extract first 2-3 letters from airline name
  const airlineCode = airline
    .replace(/[^A-Za-z]/g, '')
    .substring(0, 2)
    .toUpperCase()

  // Generate random 4-digit number
  const flightNum = Math.floor(1000 + Math.random() * 9000)

  return `${airlineCode}-${flightNum}`
}

/**
 * Generate Airway Bill Number
 * Format: XXX-XXXXXXXX (carrier code + 8 digits)
 */
export function generateAirwayBillNumber(carrier: string): string {
  // Extract first 3 letters from carrier name
  const carrierCode = carrier
    .replace(/[^A-Za-z]/g, '')
    .substring(0, 3)
    .toUpperCase()

  // Generate random 8-digit number
  const billNum = Math.floor(10000000 + Math.random() * 90000000)

  return `${carrierCode}-${billNum}`
}

/**
 * Generate EAN13 barcode number
 * Returns a 13-digit number suitable for EAN13 barcode generation
 */
export function generateBarcode(): string {
  // Generate 12 random digits
  let code = ''
  for (let i = 0; i < 12; i++) {
    code += Math.floor(Math.random() * 10)
  }

  // Calculate EAN13 check digit
  let sum = 0
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(code[i])
    sum += i % 2 === 0 ? digit : digit * 3
  }
  const checkDigit = (10 - (sum % 10)) % 10

  return code + checkDigit
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format datetime to YYYY-MM-DD HH:MM:SS
 */
export function formatDateTime(date: Date): string {
  const dateStr = formatDate(date)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${dateStr} ${hours}:${minutes}:${seconds}`
}

/**
 * Local storage helpers
 */
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle quota exceeded or other errors
    }
  },
  remove: (key: string) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Handle errors
    }
  },
}
