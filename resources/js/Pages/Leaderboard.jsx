import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { data } from 'autoprefixer';

export default function Leaderboard({ auth, topUsers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Ranking Global</h2>}
        >
            <Head title="Ranking" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-700 pb-2">
                            Top 10 Mais Focados
                        </h3>

                        <div className="space-y-4">
                            {topUsers.map((user, index) => (
                                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">

                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl font-black text-gray-400 dark:text-gray-500 w-8 text-center">
                                            #{index + 1}
                                        </div>

                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full"
                                        />

                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                @{user.username || 'sem_user'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-lg font-bold text-pomoblue-600 dark:text-pomoblue-400">
                                        {user.pomodoro_sessions_sum_duration_minutes || 0} min
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}