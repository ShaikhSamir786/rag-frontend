import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function LoginLoading() {
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
        </div>
    );
}
