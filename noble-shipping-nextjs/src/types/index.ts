export interface User {
  id: number
  user_id: string
  email: string
  password: string
  active: boolean
  confirmed_at?: Date
  current_login_at: Date
  current_login_ip?: string
  login_count: number
  DateCreated: Date
  roles: Role[]
  user_staff: Staffs[]
}

export interface Role {
  id: number
  name: string
  description?: string
}

export interface Staffs {
  id: number
  profile_pic: string
  first_name?: string
  middle_name?: string
  last_name?: string
  position?: string
  gender?: string
  telephone_phone?: string
  mobile?: string
  user_attribute: string
  address?: string
  address_two?: string
  datetime: Date
  user_id?: number
  user_staff?: User
}

export interface Cargo {
  id: number
  tracking_number: string
  cargo_type: string
  origin: string
  destination: string
  status: string
  last_location?: string
  estimated_delivery: Date
  current_carrier?: string
  weight?: string
  dimensions?: string
  contents_description?: string
  value?: string
  insurance?: string
  barcode?: string
  created_at: Date
  updated_at: Date
  history: CargoStatusHistory[]
  carrier: Carrier[]
  insurance_cargo?: Insurance
}

export interface CargoStatusHistory {
  id: number
  cargo_id: number
  current_carrier?: string
  status: string
  location?: string
  timestamp: Date
  history: Cargo
}

export interface Aircargo {
  id: number
  tracking_number: string
  cargo_type: string
  origin: string
  destination: string
  status: string
  last_location?: string
  estimated_delivery: Date
  current_carrier?: string
  weight?: string
  dimensions?: string
  contents_description?: string
  value?: string
  insurance?: string
  sender_name?: string
  sender_contact?: string
  receiver_name?: string
  receiver_contact?: string
  flight_number?: string
  airway_bill_number?: string
  departure_date?: Date
  arrival_date?: Date
  barcode?: string
  created_at: Date
  updated_at: Date
  aircargo_history: AircargoStatusHistory[]
  aircargo_carrier: Carrier[]
}

export interface AircargoStatusHistory {
  id: number
  aircargo_id: number
  current_carrier?: string
  status: string
  location?: string
  timestamp: Date
  aircargo_history: Aircargo
}

export interface Parcel {
  id: number
  tracking_number: string
  sender_name: string
  sender_address: string
  recipient_name: string
  recipient_address: string
  weight: number
  dimensions?: string
  contents_description?: string
  value?: number
  status: string
  current_location?: string
  estimated_delivery?: Date
  delivery_date?: Date
  barcode?: string
  created_at: Date
  updated_at: Date
  parcel_history: ParcelStatusHistory[]
  parcel_carrier: Carrier[]
}

export interface ParcelStatusHistory {
  id: number
  parcel_id: number
  status: string
  location?: string
  timestamp: Date
  parcel_history: Parcel
}

export interface RequestQuote {
  id: number
  service: string
  weight: string
  length: string
  height: string
  from_country: string
  to_country: string
  email_address: string
  timestamp: Date
}

export interface GetInTouch {
  id: number
  first_name: string
  last_name: string
  email: string
  website?: string
  message: string
  timestamp: Date
}

// Form Data Types
export interface LoginFormData {
  email: string
  password: string
  remember?: boolean
}

export interface QuoteFormData {
  service: string
  weight: string
  length: string
  height: string
  from_country: string
  to_country: string
  email_address: string
}

export interface ContactFormData {
  first_name: string
  last_name: string
  email: string
  website?: string
  message: string
}

export interface TrackingFormData {
  tracking_number: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

// Session Types
export interface SessionUser {
  id: string
  email: string
  name?: string
  roles?: string[]
}

declare global {
  interface Window {
    jQuery: any
    $: any
  }
}