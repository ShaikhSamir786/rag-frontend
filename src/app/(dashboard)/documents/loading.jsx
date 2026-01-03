import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function DocumentsLoading() {
    return (
        <div className="flex justify-center items-center h-full min-h-[400px]">
            <LoadingSpinner />
        </div>
    );
}
