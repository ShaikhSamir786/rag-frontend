export class TenantManager {
    constructor() {
        this.currentTenant = null;
        this.tenantConfigs = new Map();
        this.loadTenantFromStorage();
    }

    static getInstance() {
        if (!TenantManager.instance) {
            TenantManager.instance = new TenantManager();
        }
        return TenantManager.instance;
    }

    setTenant(tenant) {
        this.currentTenant = tenant;
        this.saveTenantToStorage(tenant);
        this.loadTenantConfig(tenant.id);
    }

    getCurrentTenant() {
        return this.currentTenant;
    }

    getCurrentTenantId() {
        return this.currentTenant?.id || null;
    }

    getTenantConfig(tenantId) {
        return this.tenantConfigs.get(tenantId);
    }

    clearTenant() {
        this.currentTenant = null;
        this.removeTenantFromStorage();
    }

    loadTenantFromStorage() {
        if (typeof window === 'undefined') return;

        const tenantData = localStorage.getItem('currentTenant');
        if (tenantData) {
            try {
                this.currentTenant = JSON.parse(tenantData);
                if (this.currentTenant) {
                    this.loadTenantConfig(this.currentTenant.id);
                }
            } catch (error) {
                console.error('Failed to parse tenant data:', error);
            }
        }
    }

    saveTenantToStorage(tenant) {
        if (typeof window === 'undefined') return;
        localStorage.setItem('currentTenant', JSON.stringify(tenant));
    }

    removeTenantFromStorage() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('currentTenant');
    }

    async loadTenantConfig(tenantId) {
        try {
            // Fetch tenant-specific configuration
            const response = await fetch(`/api/tenants/${tenantId}/config`);
            if (response.ok) {
                const config = await response.json();
                this.tenantConfigs.set(tenantId, config);
            }
        } catch (error) {
            console.error('Failed to load tenant config:', error);
        }
    }
}
