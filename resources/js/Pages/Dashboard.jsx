import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ auth }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-200">Painel Principal</h2>}
        >
            <Head title="Painel" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">

                    {/* CONTAINER MINIMALISTA DO PAINEL */}
                    <div className="bg-white dark:bg-gray-800 p-12 shadow-2xl sm:rounded-3xl border border-gray-100 dark:border-gray-900 flex flex-col items-center transition-colors duration-300">

                        {/* A SUA LOGO AQUI NO TOPO DO PAINEL */}
                        <img src="/images/logopomotdl.png" alt="PomoTDL Logo" className="w-56 mb-16 h-auto" />

                        <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">

                            {/* Card Tarefas - Usando o componente Link do Inertia */}
                            <Link href="/tarefas" className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-10 rounded-2xl flex items-center gap-8 hover:bg-pomoblue-50/50 hover:border-pomoblue-100 transition-colors group h-full">
                                <span className="text-5xl">📝</span>
                                <div>
                                    <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-300 group-hover:text-pomoblue-700">Minhas Tarefas</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Visualize, adicione, edite e organize a sua lista de afazeres diários.</p>
                                </div>
                            </Link>

                            {/* Card Pomodoro */}
                            <Link href="/pomodoro" className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-10 rounded-2xl flex items-center gap-8 hover:bg-pomoblue-50/50 hover:border-pomoblue-100 transition-colors group h-full">
                                <span className="text-5xl">⏱️</span>
                                <div>
                                    <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-300 group-hover:text-pomoblue-700">Foco & Pomodoro</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Inicie sessões de 25 minutos para garantir concentração total e gerenciar seu tempo.</p>
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}