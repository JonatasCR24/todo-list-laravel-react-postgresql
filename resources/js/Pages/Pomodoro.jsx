import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function Pomodoro() {
    // 1. Pegamos o objeto 'auth' de dentro de 'props'
    const { auth } = usePage().props;

    // estado do timer (em segundos)
    const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutos

    // estado para saber se o timer está rodando ou não
    const [isRunning, setIsRunning] = React.useState(false);

    // estado para quebrar para saber se estamos em período de foco ou descanso
    const [isBreak, setIsBreak] = React.useState(false); // false = Foco, true = Descanso

    // funcoes de controle 

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    }

    const resetTimer = () => {
        setIsRunning(false);
        // Reseta para 5 ou 25 dependendo de qual modo estamos AGORA
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    };

    const switchMode = (isBreakMode) => {
        setIsRunning(false); // Sempre pausa por segurança ao trocar de aba
        setIsBreak(isBreakMode); // Aceita o true ou false que veio do botão
        setTimeLeft(isBreakMode ? 5 * 60 : 25 * 60); // Se for pausa, 5 min. Se não, 25 min.
    };

    // funcao formatTime para mostrar o tempo no formato MM:SS
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    // useEffect para controlar a contagem regressiva
    useEffect(() => {
        let timerInterval;

        if (isRunning) {
            timerInterval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [isRunning]);

    return (
        // 2. Passamos o user para o Layout saber quem está logado
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Meu Pomodoro</h2>}
        >
            <Head title="Pomodoro" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-2xl p-8 flex flex-col items-center max-w-md w-full mx-auto border border-gray-100">

                        {/* ABAS DE MODO (Foco vs Pausa) */}
                        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => switchMode(false)}
                                className={`px-6 py-2 rounded-md font-bold transition-all ${!isBreak ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Pomodoro
                            </button>
                            <button
                                onClick={() => switchMode(true)}
                                className={`px-6 py-2 rounded-md font-bold transition-all ${isBreak ? 'bg-white text-emerald-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Pausa Curta
                            </button>
                        </div>

                        {/* O RELÓGIO GIGANTE */}
                        <div className={`flex flex-col items-center justify-center rounded-full w-64 h-64 border-[12px] shadow-inner mb-8 transition-colors duration-500 ${!isBreak ? 'border-indigo-100 bg-indigo-50/30' : 'border-emerald-100 bg-emerald-50/30'}`}>
                            <span className={`text-6xl font-black tracking-tighter ${!isBreak ? 'text-indigo-600' : 'text-emerald-500'}`}>
                                {formatTime(timeLeft)}
                            </span>
                        </div>

                        {/* BOTÕES DE CONTROLE (Play / Pause / Reset) */}
                        <div className="flex gap-4 w-full">
                            <button
                                onClick={toggleTimer}
                                className={`flex-1 py-4 font-black rounded-xl text-xl text-white shadow-lg transition-transform hover:-translate-y-1 ${!isBreak ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'}`}
                            >
                                {isRunning ? 'PAUSAR ⏸️' : 'COMEÇAR ▶️'}
                            </button>

                            <button
                                onClick={resetTimer}
                                className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl text-xl hover:bg-gray-200 transition-colors"
                                title="Zerar cronômetro"
                            >
                                🔄
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}