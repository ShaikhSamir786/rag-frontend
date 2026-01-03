/**
 * Error handler utility for parsing and displaying backend errors
 */

export class ApiError extends Error {
    constructor(message, status, details = []) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

/**
 * Parse backend error response
 * Backend format: { success: false, error: "message", details: [...] }
 */
export const parseError = (error) => {
    // Network errors
    if (!error.response) {
        if (error.code === 'ECONNABORTED') {
            return new ApiError('Request timeout. Please try again.', 408);
        }
        if (error.message === 'Network Error') {
            return new ApiError('Connection failed. Please check your internet connection.', 0);
        }
        return new ApiError('An unexpected error occurred. Please try again.', 0);
    }

    const { status, data } = error.response;

    // Backend error format
    if (data && typeof data === 'object') {
        const errorMessage = data.error || data.message || 'An error occurred';
        const details = data.details || data.errors || [];

        return new ApiError(errorMessage, status, details);
    }

    // Fallback to status text
    return new ApiError(
        error.response.statusText || 'An error occurred',
        status
    );
};

/**
 * Get user-friendly error message based on status code
 */
export const getErrorMessage = (status, defaultMessage) => {
    const errorMessages = {
        400: 'Invalid request. Please check your input.',
        401: 'Authentication required. Please log in.',
        403: 'Access denied. You do not have permission to perform this action.',
        404: 'Resource not found.',
        408: 'Request timeout. Please try again.',
        409: 'Conflict. This resource already exists.',
        422: 'Validation failed. Please check your input.',
        429: 'Too many requests. Please wait a moment and try again.',
        500: 'Server error. Please try again later.',
        502: 'Bad gateway. The service is temporarily unavailable.',
        503: 'Service unavailable. Please try again later.',
        504: 'Gateway timeout. Please try again later.',
    };

    return errorMessages[status] || defaultMessage || 'An unexpected error occurred.';
};

/**
 * Extract field-level validation errors
 */
export const getFieldErrors = (error) => {
    if (!error.details || !Array.isArray(error.details)) {
        return {};
    }

    const fieldErrors = {};
    error.details.forEach((detail) => {
        const field = detail.field || detail.path?.[0] || 'general';
        fieldErrors[field] = detail.message || detail.msg || 'Invalid value';
    });

    return fieldErrors;
};

