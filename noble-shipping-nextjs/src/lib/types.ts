// TypeScript Type Definitions for Noble Shipping Backend
// Centralized types matching Prisma schema and Flask models

import { Prisma } from '@prisma/client'

// ============================================
// API Response Types
// ============================================

export interface ApiSuccessResponse<T = any> {
    success: true
    data: T
    message?: string
}

export interface ApiErrorResponse {
    success: false
    error: string
    details?: any
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

// ============================================
// User & Authentication Types
// ============================================

export interface UserWithRoles {
    id: number
    user_id: string
    email: string
    active: boolean
    confirmed_at: Date | null
    current_login_at: Date
    current_login_ip: string | null
    login_count: number
    DateCreated: Date
    roles: Role[]
    Staffs: Staff[]
}

export interface Role {
    id: number
    name: string
    description: string | null
}

export interface Staff {
    id: number
    profile_pic: string
    first_name: string | null
    middle_name: string | null
    last_name: string | null
    position: string | null
    gender: string | null
    telephone_phone: string | null
    mobile: string | null
    user_attribute: string
    address: string | null
    address_two: string | null
    datetime: Date
    user_id: number | null
}

// ============================================
// Cargo Types
// ============================================

export interface CargoWithHistory {
    id: number
    tracking_number: string
    cargo_type: string
    origin: string
    destination: string
    status: string
    last_location: string | null
    estimated_delivery: Date
    current_carrier: string | null
    weight: string | null
    dimensions: string | null
    contents_description: string | null
    value: string | null
    insurance: string | null
    barcode: string | null
    created_at: Date
    updated_at: Date
    CargoStatusHistory: CargoStatusHistory[]
}

export interface CargoStatusHistory {
    id: number
    cargo_id: number
    current_carrier: string | null
    status: string
    location: string | null
    timestamp: Date
}

// ============================================
// Aircargo Types
// ============================================

export interface AircargoWithHistory {
    id: number
    tracking_number: string
    cargo_type: string
    origin: string
    destination: string
    status: string
    last_location: string | null
    estimated_delivery: Date
    current_carrier: string | null
    weight: string | null
    dimensions: string | null
    contents_description: string | null
    value: string | null
    insurance: string | null
    sender_name: string | null
    sender_contact: string | null
    receiver_name: string | null
    receiver_contact: string | null
    flight_number: string | null
    airway_bill_number: string | null
    departure_date: Date | null
    arrival_date: Date | null
    barcode: string | null
    created_at: Date
    updated_at: Date
    AircargoStatusHistory: AircargoStatusHistory[]
}

export interface AircargoStatusHistory {
    id: number
    aircargo_id: number
    current_carrier: string | null
    status: string
    location: string | null
    timestamp: Date
}

// ============================================
// Parcel Types
// ============================================

export interface ParcelWithHistory {
    id: number
    tracking_number: string
    sender_name: string
    sender_email: string | null
    sender_phone: string | null
    sender_address: string
    recipient_name: string
    recipient_email: string | null
    recipient_phone: string | null
    recipient_address: string
    weight: number
    service_type: string | null
    status: string
    shipping_cost: number | null
    estimated_delivery_date: Date | null
    created_at: Date
    updated_at: Date
    ParcelStatusHistory: ParcelStatusHistory[]
}

export interface ParcelStatusHistory {
    id: number
    parcel_id: number
    status: string
    location: string | null
    timestamp: Date
}

// ============================================
// Request/Contact Types
// ============================================

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
    website: string | null
    message: string
    timestamp: Date
}

// ============================================
// Status Enums
// ============================================

export enum CargoStatus {
    PENDING = 'Pending',
    IN_TRANSIT = 'In Transit',
    OUT_FOR_DELIVERY = 'Out for Delivery',
    DELIVERED = 'Delivered',
    DELAYED = 'Delayed',
    CANCELLED = 'Cancelled',
    ON_HOLD = 'On Hold'
}

export enum ParcelStatus {
    IN_TRANSIT = 'In Transit',
    OUT_FOR_DELIVERY = 'Out for Delivery',
    DELIVERED = 'Delivered',
    DELAYED = 'Delayed',
    RETURNED = 'Returned'
}

export enum UserRole {
    ADMIN = 'Admin',
    STAFF = 'Staff',
    USER = 'User'
}

// ============================================
// Session Types (NextAuth Extensions)
// ============================================

declare module 'next-auth' {
    interface Session {
        user: {
            id: number
            user_id: string
            email: string
            roles: string[]
            staff?: Staff
        }
    }

    interface User {
        id: number
        user_id: string
        email: string
        roles: string[]
        staff?: Staff
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: number
        user_id: string
        email: string
        roles: string[]
        staff?: Staff
    }
}

// ============================================
// Pagination Types
// ============================================

export interface PaginationParams {
    page?: number
    limit?: number
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

// ============================================
// Filter Types
// ============================================

export interface CargoFilters {
    status?: string
    origin?: string
    destination?: string
    dateFrom?: Date
    dateTo?: Date
    search?: string
}

export interface AircargoFilters extends CargoFilters {
    flight_number?: string
}

export interface ParcelFilters {
    status?: string
    sender_name?: string
    recipient_name?: string
    dateFrom?: Date
    dateTo?: Date
    search?: string
}

export interface UserFilters {
    role?: string
    active?: boolean
    user_attribute?: string
    search?: string
}

// ============================================
// Dashboard Stats Types
// ============================================

export interface DashboardStats {
    totalAircargo: number
    totalContainers: number
    totalParcels: number
    activeUsers: number
    recentAircargo: AircargoWithHistory[]
    recentContainers: CargoWithHistory[]
    recentParcels: ParcelWithHistory[]
}
