import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { tenantInterceptor } from '../interceptors/tenant.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: API_CONFIG.HEADERS,
        });

        // Apply interceptors
        authInterceptor(this.client);
        tenantInterceptor(this.client);
        errorInterceptor(this.client);
    }

    static getInstance() {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }
}

export const apiClient = ApiClient.getInstance().client;
