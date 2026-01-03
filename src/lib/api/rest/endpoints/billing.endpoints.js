import { apiClient } from '../client/axios.client';

export const billingEndpoints = {
    getInvoices: () => apiClient.get('/billing/invoices'),
    getUsage: () => apiClient.get('/billing/usage'),
};
