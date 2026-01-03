import { documentsEndpoints } from '../rest/endpoints/documents.endpoints';
import { apolloClient } from '../graphql/client/apollo.client';
import { GET_DOCUMENTS } from '../graphql/queries/documents.queries';

export const DocumentService = {
    // Hybrid: Use REST for upload/write operations
    upload: async (file) => {
        return documentsEndpoints.upload(file);
    },

    // Hybrid: Use GraphQL for complex read operations
    search: async (options) => {
        const result = await apolloClient.query({
            query: GET_DOCUMENTS,
            variables: options,
        });
        return result.data.documents;
    },
};
