import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Dashboard({ auth, stats }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-200">Painel Principal</h2>}
        >
            <Head title="Painel" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="bg-white p-8 md:p-12 shadow-2xl sm:rounded-3xl border border-gray-100 flex flex-col items-center dark:bg-gray-800 dark:border-gray-900 transition-colors duration-300">

                        <ApplicationLogo className="block h-32 md:h-40 w-auto fill-current text-gray-800 mb-8" />

                        <div className="w-full max-w-5xl mb-12">
                            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 px-2 uppercase tracking-wider text-sm">Tarefas da sua semana</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-sm font-bold text-green-600 dark:text-green-500 uppercase tracking-wide">Concluídas</span>
                                    <h2 className="text-5xl font-black text-green-700 dark:text-green-400 mt-2">{stats.completed}</h2>
                                </div>


                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wide">Pendentes</span>
                                    <h2 className="text-5xl font-black text-blue-700 dark:text-blue-400 mt-2">{stats.pending}</h2>
                                </div>


                                <div className={`border p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-colors ${stats.late > 0
                                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50'
                                    : 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800'
                                    }`}>
                                    <span className={`text-sm font-bold uppercase tracking-wide ${stats.late > 0 ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                        Atrasadas
                                    </span>
                                    <h2 className={`text-5xl font-black mt-2 ${stats.late > 0 ? 'text-red-700 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'}`}>
                                        {stats.late}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-5xl border-t border-gray-100 dark:border-gray-700 mb-12"></div>

                        <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
                            <Link href="/tarefas" className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-10 rounded-2xl flex items-center gap-8 hover:bg-pomoblue-50/50 hover:border-pomoblue-100 transition-colors group h-full shadow-sm hover:shadow-md">
                                <span className="text-5xl group-hover:scale-110 transition-transform">📝</span>
                                <div>
                                    <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-300 group-hover:text-pomoblue-700 dark:group-hover:text-pomoblue-400 transition-colors">Minhas Tarefas</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Visualize, adicione, edite e organize a sua lista de afazeres.</p>
                                </div>
                            </Link>

                            <Link href="/pomodoro" className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-10 rounded-2xl flex items-center gap-8 hover:bg-pomoblue-50/50 hover:border-pomoblue-100 transition-colors group h-full shadow-sm hover:shadow-md">
                                <span className="text-5xl group-hover:scale-110 transition-transform">⏱️</span>
                                <div>
                                    <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-300 group-hover:text-pomoblue-700 dark:group-hover:text-pomoblue-400 transition-colors">Foco & Pomodoro</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Inicie sessões personalizadas para garantir concentração total e gerenciar seu tempo.</p>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}