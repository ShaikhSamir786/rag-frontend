import { useQuery } from '@apollo/client';
import { GET_DOCUMENTS } from '../queries/documents.queries';

export function useDocumentsQuery(options) {
    return useQuery(GET_DOCUMENTS, options);
}
