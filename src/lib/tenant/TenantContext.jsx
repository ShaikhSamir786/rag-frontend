'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { TenantManager } from './TenantManager';

const TenantContext = createContext(undefined);

export function TenantProvider({ children }) {
    const [tenant, setTenantState] = useState(null);
    const tenantManager = TenantManager.getInstance();

    useEffect(() => {
        const currentTenant = tenantManager.getCurrentTenant();
        setTenantState(currentTenant);
    }, []);

    const setTenant = (newTenant) => {
        tenantManager.setTenant(newTenant);
        setTenantState(newTenant);
    };

    const clearTenant = () => {
        tenantManager.clearTenant();
        setTenantState(null);
    };

    return (
        <TenantContext.Provider value={{ tenant, setTenant, clearTenant }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
}
