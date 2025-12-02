import { z } from 'zod'
import { STATUS_OPTIONS, INSURANCE_OPTIONS } from './constants'


// ============================================
// Authentication Schemas
// ============================================

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional()
})

// ============================================
// Public Form Schemas
// ============================================

export const quoteSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  weight: z.string().min(1, 'Weight is required'),
  length: z.string().min(1, 'Length is required'),
  height: z.string().min(1, 'Height is required'),
  from_country: z.string().min(1, 'Origin country is required'),
  to_country: z.string().min(1, 'Destination country is required'),
  email_address: z.string().email('Please enter a valid email address')
})

export const contactSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export const trackingSchema = z.object({
  tracking_number: z.string().min(3, 'Tracking number must be at least 3 characters')
})

// ============================================
// Cargo/Container Schemas
// ============================================

export const containerSchema = z.object({
  tracking_number: z.string()
    .regex(/^[A-Z]{3}\d{6}[A-Z]{2}$/, 'Invalid tracking number format (must be 3 letters + 6 digits + 2 letters)')
    .optional(), // Optional to allow auto-generation
  cargo_type: z.string().min(1, 'Cargo type is required'),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  status: z.enum(STATUS_OPTIONS as [string, ...string[]]),
  last_location: z.string().optional(),
  estimated_delivery: z.string().min(1, 'Estimated delivery date is required'),
  current_carrier: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  contents_description: z.string().optional(),
  value: z.string().optional(),
  insurance: z.enum(INSURANCE_OPTIONS as [string, ...string[]]).optional().default('No Insurance')
})

export const cargoStatusHistorySchema = z.object({
  cargo_id: z.number().int().positive('Invalid cargo ID'),
  current_carrier: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
  location: z.string().optional()
})

// ============================================
// Aircargo Schemas
// ============================================

export const aircargoSchema = z.object({
  tracking_number: z.string()
    .regex(/^[A-Z]{3}\d{6}[A-Z]{2}$/, 'Invalid tracking number format (must be 3 letters + 6 digits + 2 letters)')
    .optional(), // Optional to allow auto-generation
  cargo_type: z.string().min(1, 'Cargo type is required'),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  status: z.enum(STATUS_OPTIONS as [string, ...string[]]),
  last_location: z.string().optional(),
  estimated_delivery: z.string().optional(),
  current_carrier: z.string().optional(),
  sender_name: z.string().optional(),
  sender_contact: z.string().optional(),
  receiver_name: z.string().optional(),
  receiver_contact: z.string().optional(),
  flight_number: z.string().optional(),
  airway_bill_number: z.string().optional(),
  departure_date: z.string().optional(),
  arrival_date: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  contents_description: z.string().optional(),
  value: z.string().optional(),
  insurance: z.enum(INSURANCE_OPTIONS as [string, ...string[]]).optional().default('No Insurance')
})

export const aircargoStatusHistorySchema = z.object({
  aircargo_id: z.number().int().positive('Invalid aircargo ID'),
  current_carrier: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
  location: z.string().optional()
})

// ============================================
// Parcel Schemas
// ============================================

export const parcelSchema = z.object({
  tracking_number: z.string()
    .regex(/^[A-Z]{3}\d{6}[A-Z]{2}$/, 'Invalid tracking number format (must be 3 letters + 6 digits + 2 letters)'),
  sender_name: z.string().min(1, 'Sender name is required'),
  sender_email: z.string().email('Valid email required').optional().or(z.literal('')),
  sender_phone: z.string().optional(),
  sender_address: z.string().min(1, 'Sender address is required'),
  recipient_name: z.string().min(1, 'Recipient name is required'),
  recipient_email: z.string().email('Valid email required').optional().or(z.literal('')),
  recipient_phone: z.string().optional(),
  recipient_address: z.string().min(1, 'Recipient address is required'),
  weight: z.coerce.number().positive('Weight must be a positive number'),
  service_type: z.string().optional(),
  estimated_delivery_date: z.string().optional(),
  shipping_cost: z.coerce.number().nonnegative('Shipping cost cannot be negative').optional(),
  status: z.enum(STATUS_OPTIONS as [string, ...string[]])
})

export const parcelStatusHistorySchema = z.object({
  parcel_id: z.number().int().positive('Invalid parcel ID'),
  status: z.string().min(1, 'Status is required'),
  location: z.string().optional()
})

// ============================================
// User & Staff Schemas
// ============================================

export const userSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Last name is required'),
  position: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Other', '']).optional(),
  telephone_phone: z.string().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),
  address_two: z.string().optional(),
  user_attribute: z.string().optional(),
  roles: z.array(z.string()).min(1, 'At least one role is required'),
  profile_pic: z.string().optional()
})

export const userUpdateSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Last name is required'),
  position: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Other', '']).optional(),
  telephone_phone: z.string().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),
  address_two: z.string().optional(),
  user_attribute: z.string().optional(),
  roles: z.array(z.string()).optional(),
  active: z.boolean(),
  profile_pic: z.string().optional()
})

export const passwordChangeSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string()
    .min(6, 'New password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
})

export const adminPasswordResetSchema = z.object({
  user_id: z.number().int().positive().optional(),
  email: z.string().email().optional(),
  new_password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
}).refine(data => data.user_id || data.email, {
  message: 'Either user_id or email must be provided'
})

// ============================================
// Dashboard & Filter Schemas
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10)
})

export const cargoFilterSchema = paginationSchema.extend({
  status: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['created_at', 'estimated_delivery', 'status', 'tracking_number']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
})

export const aircargoFilterSchema = cargoFilterSchema.extend({
  flight_number: z.string().optional()
})

export const parcelFilterSchema = paginationSchema.extend({
  status: z.string().optional(),
  sender_name: z.string().optional(),
  recipient_name: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['created_at', 'estimated_delivery_date', 'status', 'tracking_number']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
})

export const userFilterSchema = paginationSchema.extend({
  role: z.string().optional(),
  active: z.string().optional(),
  user_attribute: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['DateCreated', 'email', 'current_login_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
})

// ============================================
// Custom Validators
// ============================================

// Re-export canonical tracking number validator from utils
export { validateTrackingNumber } from './utils'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone)
}

export const validateDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const validateFileType = (filename: string, allowedTypes: string[]): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

// ============================================
// Type Exports
// ============================================

export type LoginFormData = z.infer<typeof loginSchema>
export type QuoteFormData = z.infer<typeof quoteSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type TrackingFormData = z.infer<typeof trackingSchema>
export type ContainerFormData = z.infer<typeof containerSchema>
export type CargoStatusHistoryFormData = z.infer<typeof cargoStatusHistorySchema>
export type AircargoFormData = z.infer<typeof aircargoSchema>
export type AircargoStatusHistoryFormData = z.infer<typeof aircargoStatusHistorySchema>
export type ParcelFormData = z.infer<typeof parcelSchema>
export type ParcelStatusHistoryFormData = z.infer<typeof parcelStatusHistorySchema>
export type UserFormData = z.infer<typeof userSchema>
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>
export type AdminPasswordResetFormData = z.infer<typeof adminPasswordResetSchema>
export type PaginationParams = z.infer<typeof paginationSchema>
export type CargoFilterParams = z.infer<typeof cargoFilterSchema>
export type AircargoFilterParams = z.infer<typeof aircargoFilterSchema>
export type ParcelFilterParams = z.infer<typeof parcelFilterSchema>
export type UserFilterParams = z.infer<typeof userFilterSchema>