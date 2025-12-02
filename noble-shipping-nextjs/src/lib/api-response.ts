// Standardized API Response Helpers
// Ensures consistent response format across all API endpoints

import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import type { ApiSuccessResponse, ApiErrorResponse } from './types'

/**
 * Success Response Helper
 * Returns standardized success response with data and optional message
 */
export function successResponse<T>(
    data: T,
    message?: string,
    status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            ...(message && { message })
        },
        { status }
    )
}

/**
 * Error Response Helper
 * Returns standardized error response with message and optional details
 */
export function errorResponse(
    message: string,
    details?: any,
    status: number = 400
): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: message,
            ...(details && { details })
        },
        { status }
    )
}

/**
 * Validation Error Response
 * Specifically for Zod validation errors
 */
export function validationErrorResponse(
    error: ZodError
): NextResponse<ApiErrorResponse> {
    const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
    }))

    return NextResponse.json(
        {
            success: false,
            error: 'Validation failed',
            details: formattedErrors
        },
        { status: 422 }
    )
}

/**
 * Unauthorized Response
 * For authentication failures (401)
 */
export function unauthorizedResponse(
    message: string = 'Authentication required'
): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: message
        },
        { status: 401 }
    )
}

/**
 * Forbidden Response
 * For authorization failures (403)
 */
export function forbiddenResponse(
    message: string = 'You do not have permission to access this resource'
): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: message
        },
        { status: 403 }
    )
}

/**
 * Not Found Response
 * For resource not found errors (404)
 */
export function notFoundResponse(
    resource: string = 'Resource'
): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: `${resource} not found`
        },
        { status: 404 }
    )
}

/**
 * Server Error Response
 * For internal server errors (500)
 */
export function serverErrorResponse(
    message: string = 'An internal server error occurred',
    details?: any
): NextResponse<ApiErrorResponse> {
    // Log the error details for debugging
    if (details) {
        console.error('Server Error:', details)
    }

    return NextResponse.json(
        {
            success: false,
            error: message,
            ...(process.env.NODE_ENV === 'development' && details && { details })
        },
        { status: 500 }
    )
}

/**
 * Created Response
 * For successful resource creation (201)
 */
export function createdResponse<T>(
    data: T,
    message?: string
): NextResponse<ApiSuccessResponse<T>> {
    return successResponse(data, message, 201)
}

/**
 * No Content Response
 * For successful operations with no content to return (204)
 */
export function noContentResponse(): NextResponse {
    return new NextResponse(null, { status: 204 })
}
