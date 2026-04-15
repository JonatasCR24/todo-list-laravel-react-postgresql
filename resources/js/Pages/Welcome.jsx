import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer'; // 👈 AQUI ESTÁ A CHAVE DA IMPORTAÇÃO!

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Focus & Tasks" />

            <div className="relative min-h-screen bg-gray-50 selection:bg-pomoblue-100 selection:text-pomoblue-800 dark:bg-gray-900 transition-colors duration-300">

                {/* BARRA SUPERIOR (NAV) */}
                <div className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center relative z-10">
                    <img src="/images/logo.png" alt="PomoTDL Logo" className="h-16 w-auto" />

                    <div className="flex gap-4 items-center">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-700 dark:text-gray-400 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-pomoblue"
                            >
                                Voltar para o Painel
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-700 dark:text-gray-400 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-pomoblue"
                                >
                                    Entrar
                                </Link>

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

                {/*Tela grandona (principal)*/}
                <div className="relative flex flex-col items-center pt-10 pb-20 justify-center px-6">
                    <div className="bg-white p-16 shadow-2xl sm:rounded-3xl border border-gray-100 flex flex-col items-center text-center max-w-4xl w-full dark:bg-gray-800 dark:border-gray-900 transition-colors duration-300 relative overflow-hidden">
                        
                        <ApplicationLogo className="block h-44 w-auto fill-current text-gray-800 mb-8 z-10 relative" />

                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-gray-200 tracking-tighter mb-6 relative z-10">
                            Organize seu dia.<br />
                            Domine sua <span className="text-pomoblue-600">concentração</span>.
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl relative z-10">
                            O PomoTDL combina a simplicidade de uma lista de afazeres com o poder científico da técnica Pomodoro. Fique focado, realize mais e elimine distrações.
                        </p>

                        <div className="flex gap-6 relative z-10">
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="px-10 py-5 bg-pomoblue-600 text-white font-black rounded-2xl text-xl shadow-lg hover:bg-pomoblue-700 transition active:scale-95"
                            >
                                {auth.user ? 'Abrir meu Pomodoro' : 'Criar minha Conta'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/*SEÇÃO DE BENEFÍCIOS*/}
                <div className="max-w-6xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Cartão 1 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-pomoblue-100 dark:bg-gray-700 text-pomoblue-600 dark:text-pomoblue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Foco Inabalável</h3>
                            <p className="text-gray-600 dark:text-gray-400">Treine sua mente para a concentração profunda com o cronômetro Pomodoro personalizável e rádio Lofi integrada.</p>
                        </div>

                        {/* Cartão 2 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-pomoblue-100 dark:bg-gray-700 text-pomoblue-600 dark:text-pomoblue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Organização Total</h3>
                            <p className="text-gray-600 dark:text-gray-400">Gerencie suas tarefas, tags e prioridades em uma interface limpa que tira a bagunça da sua cabeça.</p>
                        </div>

                        {/* Cartão 3 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-pomoblue-100 dark:bg-gray-700 text-pomoblue-600 dark:text-pomoblue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Progresso Visível</h3>
                            <p className="text-gray-600 dark:text-gray-400">Acompanhe suas estatísticas de tempo focado e veja sua evolução no Ranking Global da comunidade.</p>
                        </div>

                    </div>
                </div>

                {/*CHAMADA FINAL*/}
                {!auth.user && (
                    <div className="pb-24 px-6">
                        <div className="bg-pomoblue-600 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                                Pronto para revolucionar sua rotina?
                            </h2>
                            <p className="text-pomoblue-100 text-lg mb-8 max-w-xl mx-auto">
                                Junte-se ao PomoTDL e descubra o quanto você consegue produzir quando elimina as distrações.
                            </p>
                            <Link
                                href={route('register')}
                                className="px-10 py-4 bg-white text-pomoblue-700 font-bold rounded-full text-lg shadow-md hover:bg-gray-50 transition active:scale-95 inline-block"
                            >
                                Começar Gratuitamente
                            </Link>
                        </div>
                    </div>
                )}
                {/*FOOTER*/}
                <Footer />
            </div>
        </>
    );
}