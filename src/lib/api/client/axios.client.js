import axios from 'axios';
// import { authInterceptor } from '../interceptors/auth.interceptor';
// import { tenantInterceptor } from '../interceptors/tenant.interceptor';
// import { errorInterceptor } from '../interceptors/error.interceptor';

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Apply interceptors
        // authInterceptor(this.client);
        // tenantInterceptor(this.client);
        // errorInterceptor(this.client);
    }

    static getInstance() {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }
}

export const apiClient = ApiClient.getInstance().client;
