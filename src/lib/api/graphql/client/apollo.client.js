import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_CONFIG } from '@/config/api.config';

export const apolloClient = new ApolloClient({
    uri: `${API_CONFIG.BASE_URL}/graphql`,
    cache: new InMemoryCache(),
});
