import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items }) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </Link>
                </li>
                {items && items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            {item.href ? (
                                <Link href={item.href} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
