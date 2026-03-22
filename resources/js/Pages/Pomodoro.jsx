import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import React, { useEffect } from 'react';

export default function Pomodoro() {

    // o usePage() é um hook do Inertia que nos dá acesso às props enviadas pelo backend.
    const { auth, flash, totalFocusMinutes, totalSessions } = usePage().props;

    // estado do timer (em segundos)
    const [timeLeft, setTimeLeft] = React.useState(25 * 1); // 25 minutos

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

    // funcao para formatar o tempo total focado em horas e minutos
    const formatTotalTime = (totalMin) => {
        if (!totalMin) return '0m';

        const hours = Math.floor(totalMin / 60);
        const minutes = totalMin % 60;

        if (hours > 0) {
            return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
        };

        return `${minutes}m`;
    }

    // useEffect para checar pra mandar mensagem
    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                toast: true, // pequeno e no canto
                position: 'top-end',
                icon: 'success',
                title: flash.success,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }, [flash]); // o array [flash] diz ao react para monitorar essa variavel

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


    React.useEffect(() => {
        const timeStr = formatTime(timeLeft);
        const modeStr = isBreak ? 'Descanso' : 'Foco';

        document.title = `${modeStr} - ${timeStr}`;

        return () => {
            document.title = 'Pomodoro';
        }
    }, [timeLeft, isBreak]);

    // tocar som quando o timer chegar a zero
    useEffect(() => {
        if (timeLeft === 0) {
            const alarme = new Audio('/sounds/alarme.mp3');
            alarme.play().catch(e => console.log("Erro ao tocar o som:", e));

            router.post('/pomodoro/session', {
                duration_minutes: isBreak ? 5 : 25,
                type: isBreak ? 'short_break' : 'focus',
            }, {
                preserveScroll: true,

            });
        }
    }, [timeLeft, isBreak]);


    // Verifica se o timer está no tempo inicial (25m no foco ou 5m na pausa)
    const isPristine = isBreak ? timeLeft === 5 * 60 : timeLeft === 25 * 60;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Meu Pomodoro</h2>}
        >
            <Head title="Pomodoro" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">

                    {/* CONTAINER MINIMALISTA */}
                    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-3xl p-10 shadow-sm">

                        {/* ABAS DISCRETAS */}
                        <div className="flex gap-8 mb-16 text-lg font-medium text-gray-400">
                            <button
                                onClick={() => switchMode(false)}
                                className={`transition-all pb-2 ${!isBreak ? 'text-gray-900 border-b-2 border-gray-900' : 'hover:text-gray-600'}`}
                            >
                                Foco
                            </button>
                            <button
                                onClick={() => switchMode(true)}
                                className={`transition-all pb-2 ${isBreak ? 'text-gray-900 border-b-2 border-gray-900' : 'hover:text-gray-600'}`}
                            >
                                Descanso
                            </button>
                        </div>

                        {/* CRONÔMETRO GIGANTE (text-9xl) */}
                        <div className="mb-16">
                            <h1 className="text-9xl font-black text-gray-800 tracking-tighter tabular-nums">
                                {formatTime(timeLeft)}
                            </h1>
                        </div>

                        {/* CONTROLES */}
                        <div className="flex items-center gap-8 h-20">

                            {/* BOTÃO PLAY/PAUSE REDONDO E SÓLIDO */}
                            <button
                                onClick={toggleTimer}
                                className="w-20 h-20 flex items-center justify-center bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-transform active:scale-95 shadow-lg"
                            >
                                {isRunning ? (
                                    /* Ícone de Pause */
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                ) : (
                                    // texto falando medio falando iniciar se for começar um novo cronometro ou voltar se ele tiver sido pausado
                                    <span className="text-sm font-semibold">
                                        {isPristine ? 'Iniciar' : 'Voltar'}
                                    </span>
                                )}
                            </button>

                            {/* BOTÃO RESET CONDICIONAL */}
                            {!isPristine && (
                                <button
                                    onClick={resetTimer}
                                    className="text-gray-400 hover:text-gray-800 transition-colors animate-fade-in-up"
                                    title="Zerar cronômetro"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* ESTATÍSTICAS DO USUÁRIO */}
                        <div className="mt-16 pt-8 border-t border-gray-100 w-full flex justify-center gap-16 text-center animate-fade-in-up">

                            <div>
                                <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">Total Focado</p>
                                <p className="text-3xl font-black text-pomoblue-600">
                                    {formatTotalTime(totalFocusMinutes)}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">Sessões Concluidas</p>
                                <p className="text-3xl font-black text-pomoblue-600">
                                    {totalSessions} <span className="text-lg text-pomoblue-400 font-medium">
                                        {totalSessions === 1 ? 'sessão' : 'sessões'}
                                    </span>
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}