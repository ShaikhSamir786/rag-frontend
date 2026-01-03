import { UserMenu } from './UserMenu';

export function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center gap-4">
                {/* Notifications and UserMenu would go here */}
                <UserMenu />
            </div>
        </header>
    );
}
