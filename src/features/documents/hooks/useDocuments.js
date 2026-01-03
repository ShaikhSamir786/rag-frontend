import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDocuments, setPagination, setLoading } from '../store/documentsSlice';
import { documentsEndpoints as documentsApi } from '@/lib/api/rest/endpoints/documents.endpoints';

export function useDocuments() {
    const dispatch = useAppDispatch();
    const { documents, filters, pagination, isLoading } = useAppSelector(
        (state) => state.documents
    );

    const { data, error, refetch } = useQuery({
        queryKey: ['documents', filters, pagination.page],
        queryFn: async () => {
            dispatch(setLoading(true));
            const result = await documentsApi.getAll({
                page: pagination.page,
                limit: pagination.limit,
                ...filters,
            });
            dispatch(setDocuments(result.data));
            dispatch(setPagination({ total: result.total, page: result.page }));
            dispatch(setLoading(false));
            return result;
        },
    });

    return {
        documents,
        pagination,
        isLoading,
        error,
        refetch,
    };
}
