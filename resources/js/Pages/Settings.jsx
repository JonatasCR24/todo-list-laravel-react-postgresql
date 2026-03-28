import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Settings() {

    const { auth, preferences, flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        pomodoro_focus_minutes: preferences?.pomodoro_focus_minutes || 25,
        pomodoro_break_minutes: preferences?.pomodoro_break_minutes || 5,
        lofi_focus_id: preferences?.lofi_focus_id || '',
        lofi_break_id: preferences?.lofi_break_id || '',
    });

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: flash.success,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }, [flash]);

    const submit = (e) => {
        e.preventDefault(); // Evita que a página recarregue
        put('/configuracoes');
    };

    //funcao para pegar só o id do youtube (pra ser a prova do usuário burro)

    const extractYouTubeID = (input) => {
        if (!input) return '';

        // se o usuário for inteligente:
        if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

        // se o usuário for burro:
        const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]{11})/);

        // Retorna o ID encontrado. Se não achar nada de útil, retorna o que foi digitado mesmo
        return match ? match[1] : input;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-200">Configurações</h2>}
        >
            <Head title="Configurações - PomoTDL" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">

                    {/* CARD MINIMALISTA DAS CONFIGURAÇÕES */}
                    <div className="bg-white p-10 shadow-sm sm:rounded-3xl border border-gray-100 dark:border-gray-900 dark:bg-gray-800 transition-colors duration-300">

                        <div className="mb-8 border-b border-gray-100 dark:border-gray-200 pb-5">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 ">⏱️ Preferências do Pomodoro</h3>
                            <p className="text-gray-500 mt-1 dark:text-gray-400">Ajuste a duração das suas sessões de foco e descanso.</p>
                        </div>

                        {/* O FORMULÁRIO LIGADO AO useForm */}
                        <form onSubmit={submit} className="space-y-6">

                            {/* CAMPO: TEMPO DE FOCO */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Minutos de Foco
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={data.pomodoro_focus_minutes}
                                    onChange={(e) => setData('pomodoro_focus_minutes', e.target.value)}
                                    className="w-full dark:bg-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-800 focus:border-pomoblue-500 focus:ring-pomoblue-500 rounded-xl shadow-sm px-4 py-3"
                                />
                                {/* Mostra o erro de validação do Laravel em vermelho se existir */}
                                {errors.pomodoro_focus_minutes && <div className="text-red-500 text-sm mt-1">{errors.pomodoro_focus_minutes}</div>}
                            </div>

                            {/* CAMPO: TEMPO DE PAUSA */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Minutos de Pausa
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={data.pomodoro_break_minutes}
                                    onChange={(e) => setData('pomodoro_break_minutes', e.target.value)}
                                    className="w-full dark:bg-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-800 border-gray-300 focus:border-pomoblue-500 focus:ring-pomoblue-500 rounded-xl shadow-sm px-4 py-3"
                                />
                                {errors.pomodoro_break_minutes && <div className="text-red-500 text-sm mt-1">{errors.pomodoro_break_minutes}</div>}
                            </div>

                            {/* DIVISÓRIA VISUAL */}
                            <div className="pt-6 pb-2 border-t border-gray-100 dark:border-gray-700 mt-6">
                                <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">🎵 Trilhas Sonoras (YouTube)</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                    Cole apenas o <b>ID do vídeo</b>. Exemplo: no link youtube.com/watch?v=<b>jfKfPfyJRdk</b>, o ID é a parte em negrito. Deixe em branco para usar o padrão.
                                </p>
                            </div>

                            {/* CAMPO: LOFI DE FOCO */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                                    ID do Vídeo para Foco
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: jfKfPfyJRdk"
                                    value={data.lofi_focus_id}
                                    onChange={(e) => setData('lofi_focus_id', extractYouTubeID(e.target.value))}
                                    className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:border-pomoblue-500 focus:ring-pomoblue-500 rounded-xl shadow-sm px-4 py-3 transition-colors"
                                />
                                {errors.lofi_focus_id && <div className="text-red-500 text-sm mt-1">{errors.lofi_focus_id}</div>}
                            </div>

                            {/* CAMPO: LOFI DE DESCANSO */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                                    ID do Vídeo para Descanso
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: hv1nIidG7S8"
                                    value={data.lofi_break_id}
                                    onChange={(e) => setData('lofi_break_id', extractYouTubeID(e.target.value))}
                                    className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:border-pomoblue-500 focus:ring-pomoblue-500 rounded-xl shadow-sm px-4 py-3 transition-colors"
                                />
                                {errors.lofi_break_id && <div className="text-red-500 text-sm mt-1">{errors.lofi_break_id}</div>}
                            </div>

                            {/* BOTÃO DE SALVAR */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing} // O Inertia desabilita o botão sozinho enquanto salva!
                                    className={`w-full py-4 text-white font-bold rounded-xl text-lg transition-all ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-pomoblue-600 hover:bg-pomoblue-700 shadow-lg hover:shadow-xl active:scale-95'}`}
                                >
                                    {processing ? 'Salvando...' : 'Salvar Preferências'}
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}