export const tenantThemes = {
    'tenant-1': {
        id: 'tenant-1',
        name: 'Acme Corp',
        colors: {
            primary: '#3B82F6',
            secondary: '#8B5CF6',
            accent: '#10B981',
            background: '#FFFFFF',
            foreground: '#0F172A',
        },
        logo: '/tenants/tenant-1/logo.png',
        favicon: '/tenants/tenant-1/favicon.ico',
        fonts: {
            heading: 'Inter',
            body: 'Inter',
        },
    },
    'tenant-2': {
        id: 'tenant-2',
        name: 'TechStart Inc',
        colors: {
            primary: '#EF4444',
            secondary: '#F59E0B',
            accent: '#14B8A6',
            background: '#FAFAFA',
            foreground: '#1E293B',
        },
        logo: '/tenants/tenant-2/logo.png',
        favicon: '/tenants/tenant-2/favicon.ico',
        fonts: {
            heading: 'Poppins',
            body: 'Roboto',
        },
    },
};

export const getThemeForTenant = (tenantId) => {
    return tenantThemes[tenantId] || null;
};
