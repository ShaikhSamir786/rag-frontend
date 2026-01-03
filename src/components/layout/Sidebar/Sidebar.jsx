import Link from 'next/link';

export function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white hidden md:block">
            <div className="p-6">
                <h1 className="text-2xl font-bold">RAG Platform</h1>
            </div>
            <nav className="mt-6">
                <Link href="/dashboard" className="block px-6 py-2 hover:bg-gray-800">
                    Dashboard
                </Link>
                <Link href="/documents" className="block px-6 py-2 hover:bg-gray-800">
                    Documents
                </Link>
                <Link href="/chat" className="block px-6 py-2 hover:bg-gray-800">
                    Chat
                </Link>
                <Link href="/settings" className="block px-6 py-2 hover:bg-gray-800">
                    Settings
                </Link>
            </nav>
        </aside>
    );
}
