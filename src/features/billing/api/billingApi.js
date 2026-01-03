import { apiClient } from '@/lib/api/client/axios.client';

/**
 * Billing API
 * Handles payments, invoices, and subscriptions
 */
export const billingApi = {
    /**
     * Create payment intent
     * POST /billing/payments/intent
     */
    createPaymentIntent: async (data) => {
        const response = await apiClient.post('/billing/payments/intent', {
            amount: data.amount,
            currency: data.currency || 'USD',
            paymentType: data.paymentType || 'one_time',
            description: data.description,
            metadata: data.metadata,
            idempotencyKey: data.idempotencyKey,
            customerId: data.customerId,
            receiptEmail: data.receiptEmail,
        });
        return response.data;
    },

    /**
     * Confirm payment intent
     * POST /billing/payments/:id/confirm
     */
    confirmPaymentIntent: async (paymentIntentId, data = {}) => {
        const response = await apiClient.post(`/billing/payments/${paymentIntentId}/confirm`, {
            paymentMethodId: data.paymentMethodId,
            returnUrl: data.returnUrl,
        });
        return response.data;
    },

    /**
     * Cancel payment intent
     * POST /billing/payments/:id/cancel
     */
    cancelPaymentIntent: async (paymentIntentId) => {
        const response = await apiClient.post(`/billing/payments/${paymentIntentId}/cancel`);
        return response.data;
    },

    /**
     * Get payment intent
     * GET /billing/payments/:id
     */
    getPaymentIntent: async (paymentIntentId) => {
        const response = await apiClient.get(`/billing/payments/${paymentIntentId}`);
        return response.data;
    },

    /**
     * List payments
     * GET /billing/payments?page=1&limit=20
     */
    listPayments: async (params = {}) => {
        const { page = 1, limit = 20 } = params;
        const response = await apiClient.get('/billing/payments', {
            params: { page, limit },
        });
        return {
            payments: response.data,
            pagination: response.pagination,
        };
    },

    /**
     * Generate invoice from order
     * POST /billing/invoices/order/:orderId
     */
    generateInvoice: async (orderId) => {
        const response = await apiClient.post(`/billing/invoices/order/${orderId}`);
        return response.data;
    },

    /**
     * Get invoice
     * GET /billing/invoices/:id
     */
    getInvoice: async (invoiceId) => {
        const response = await apiClient.get(`/billing/invoices/${invoiceId}`);
        return response.data;
    },

    /**
     * List invoices
     * GET /billing/invoices?page=1&limit=20
     */
    listInvoices: async (params = {}) => {
        const { page = 1, limit = 20 } = params;
        const response = await apiClient.get('/billing/invoices', {
            params: { page, limit },
        });
        return {
            invoices: response.data,
            pagination: response.pagination,
        };
    },
};

