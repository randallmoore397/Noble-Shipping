/**
 * Shared constants used across the application
 * Matches values from Python backend (noble/User/Admin/route.py, noble/models.py)
 */

// Status values for cargo tracking
export const STATUS_OPTIONS = [
    'Pending',
    'Collected',
    'In Transit',
    'Held at Customs',
    'Delivered',
    'Awaiting Pickup',
    'Delayed',
    'Returned to Sender',
] as const;

export type StatusType = typeof STATUS_OPTIONS[number];

// Status code mapping (numeric codes to status strings)
export const STATUS_CODE_MAP: Record<number, StatusType> = {
    1: 'Pending',
    2: 'Collected',
    3: 'In Transit',
    4: 'Held at Customs',
    5: 'Delivered',
    6: 'Awaiting Pickup',
    7: 'Delayed',
    8: 'Returned to Sender',
};

// Reverse mapping (status strings to numeric codes)
export const STATUS_TO_CODE_MAP: Record<StatusType, number> = {
    'Pending': 1,
    'Collected': 2,
    'In Transit': 3,
    'Held at Customs': 4,
    'Delivered': 5,
    'Awaiting Pickup': 6,
    'Delayed': 7,
    'Returned to Sender': 8,
};

// Insurance values
export const INSURANCE_OPTIONS = [
    'No Insurance',
    'Insured',
] as const;

export type InsuranceType = typeof INSURANCE_OPTIONS[number];

// Insurance code mapping (numeric codes to insurance strings)
export const INSURANCE_CODE_MAP: Record<number, InsuranceType> = {
    1: 'No Insurance',
    2: 'Insured',
};

// Reverse mapping (insurance strings to numeric codes)
export const INSURANCE_TO_CODE_MAP: Record<InsuranceType, number> = {
    'No Insurance': 1,
    'Insured': 2,
};

// Default values
export const DEFAULT_PROFILE_PIC = 'default.png';
export const DEFAULT_ROLE = 'staff';
export const DEFAULT_PASSWORD_PLACEHOLDER = '********';

// Cargo types
export const CARGO_TYPES = [
    'container',
    'aircargo',
    'parcel',
] as const;

export type CargoType = typeof CARGO_TYPES[number];

// User roles
export const USER_ROLES = [
    'Admin',
    'Staff',
    'Client',
] as const;

export type UserRole = typeof USER_ROLES[number];

// Tracking number patterns
export const TRACKING_NUMBER_PREFIX = 'NS';
export const TRACKING_NUMBER_LENGTH = 12; // NS + 10 digits

// User ID patterns
export const USER_ID_PREFIX = 'USR';
export const USER_ID_LENGTH = 10; // USR + 7 digits

// Flight number patterns
export const FLIGHT_NUMBER_LENGTH = 8; // 2 letter carrier code + 6 digits

// Airway bill number patterns
export const AIRWAY_BILL_LENGTH = 11; // 3 digit prefix + 8 digits

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 100;
export const RECENT_ITEMS_LIMIT = 10;

// File upload settings
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// QR Code settings
export const QR_CODE_SIZE = 200;
export const QR_CODE_ERROR_CORRECTION = 'M' as const;
