import { TenantManager } from '@/lib/tenant/TenantManager';

export const tenantInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const tenantId = TenantManager.getInstance().getCurrentTenantId();

            if (tenantId) {
                config.headers['X-Tenant-ID'] = tenantId;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );
};
