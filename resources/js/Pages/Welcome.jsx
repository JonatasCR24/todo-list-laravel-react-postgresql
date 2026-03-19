import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const currentYear = new Date().getFullYear();
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
                        <img src="/images/logopomotdl.png" alt="PomoTDL Logo" className="w-64 h-auto mb-16" />

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

            <footer className="bg-white mt-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8 flex flex-col items-center justify-center text-center">

                    {/* LOGO REDUZIDA NO FOOTER */}
                    <Link href="/" className="mb-6 group">
                        <img
                            src="/images/logo.png"
                            alt="PomoTDL"
                            className="h-10 w-auto transition-opacity group-hover:opacity-80"
                        />
                    </Link>

                    {/* SLOGAN CURTO */}
                    <p className="text-lg font-bold text-gray-900 tracking-tight">
                        Foque em realizar.
                    </p>
                    <p className="text-sm text-gray-500 mt-1 max-w-sm mb-8">
                        A ferramenta que une gestão de tarefas simples com a técnica de foco Pomodoro.
                    </p>

                    {/* LINKS MINIMALISTAS */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center mb-8 text-sm font-medium text-gray-600">
                        <Link href="/pomodoro" className="hover:text-pomoblue-700">O Pomodoro</Link>
                        <Link href="/tarefas" className="hover:text-pomoblue-700">Lista de Tarefas</Link>
                        <Link href="#" className="hover:text-pomoblue-700">Ajuda</Link>
                        <Link href="#" className="hover:text-pomoblue-700">Termos de Uso</Link>
                        <Link href="#" className="hover:text-pomoblue-700">Privacidade</Link>
                    </div>

                    {/* COPYRIGHT E MARCA */}
                    <div className="border-t border-gray-100 w-full pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-3">
                        <p>&copy; {currentYear} PomoTDL Co. Todos os direitos reservados.</p>
                        <p className="font-semibold flex gap-1.5 items-center">
                            Um projeto de produtividade ®️ Jonatas.
                        </p>
                    </div>

                </div>
            </footer>
        </>
    );
}