// recursos/js/Pages/Welcome.jsx

import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="PomoTDL - Focus & Tasks" />

            <div className="relative min-h-screen bg-gray-50 selection:bg-pomoblue-100 selection:text-pomoblue-800">

                {/* BARRA SUPERIOR (NAV) */}
                <div className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center relative z-10">

                    {/* A SUA LOGO AQUI NO CANTO SUPERIOR ESQUERDO */}
                    <img src="/images/logo.png" alt="PomoTDL Logo" className="h-16 w-auto" />

                    <div className="flex gap-4 items-center">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-700 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-pomoblue"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-700 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-pomoblue"
                                >
                                    Log in
                                </Link>

                                {/* BOTÃO DE CADASTRO COM A NOSSA COR NOVO */}
                                <Link
                                    href={route('register')}
                                    className="ml-4 px-6 py-2.5 bg-pomoblue-600 text-white font-bold rounded-full text-sm shadow-md hover:bg-pomoblue-700 transition active:scale-95"
                                >
                                    Começar Gratuitamente
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* CONTEÚDO PRINCIPAL (HERO) - MINIMALISTA */}
                <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6">

                    {/* CAIXA BRANCA MINIMALISTA - IGUAL AO POMODORO */}
                    <div className="bg-white p-16 shadow-2xl sm:rounded-3xl border border-gray-100 flex flex-col items-center text-center max-w-4xl w-full">

                        {/* LOGO GIGANTE NO CENTRO */}
                        <img src="/images/logo.png" alt="PomoTDL Logo" className="w-64 h-auto mb-16" />

                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-6">
                            Organize suas tarefas.<br />
                            Garanta sua <span className="text-pomoblue-600">concentração</span>.
                        </h1>

                        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
                            PomoTDL une o melhor dos dois mundos: uma lista de afazeres simples e o clássico cronômetro Pomodoro de 25 minutos. Fique focado e produza mais, sem distrações.
                        </p>

                        <div className="flex gap-6">
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="px-10 py-5 bg-pomoblue-600 text-white font-black rounded-2xl text-2xl shadow-lg hover:bg-pomoblue-700 transition active:scale-95"
                            >
                                {auth.user ? 'Ir para o Painel' : 'Criar minha Conta'}
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}