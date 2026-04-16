import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">

            <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10">

                <Link href="/">
                    <ApplicationLogo className="h-24 w-auto fill-current text-gray-500 dark:text-gray-400" />
                </Link>

                <div className="mt-8 w-full overflow-hidden bg-white dark:bg-gray-800 px-8 py-10 shadow-xl sm:max-w-md sm:rounded-3xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    {children}
                </div>

            </main>

            <div className="w-full">
                <Footer />
            </div>

        </div>
    );
}