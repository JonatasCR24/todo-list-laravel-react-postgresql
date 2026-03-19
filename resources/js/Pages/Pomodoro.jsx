import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Pomodoro() {
    // 1. Pegamos o objeto 'auth' de dentro de 'props'
    const { auth } = usePage().props;

    return (
        // 2. Passamos o user para o Layout saber quem está logado
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Meu Pomodoro</h2>}
        >
            <Head title="Pomodoro" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Pomodoro</h1>

                        {/* O RELÓGIO VAI ENTRAR AQUI */}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}