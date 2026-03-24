import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Settings() {

    const { auth, preferences, flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        pomodoro_focus_minutes: preferences?.pomodoro_focus_minutes || 25,
        pomodoro_break_minutes: preferences?.pomodoro_break_minutes || 5,
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-200">Configurações</h2>}
        >
            <Head title="Configurações - PomoTDL" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">

                    {/* CARD MINIMALISTA DAS CONFIGURAÇÕES */}
                    <div className="bg-white p-10 shadow-sm sm:rounded-3xl border border-gray-100">

                        <div className="mb-8 border-b border-gray-100 pb-5">
                            <h3 className="text-2xl font-black text-gray-900">⏱️ Preferências do Pomodoro</h3>
                            <p className="text-gray-500 mt-1">Ajuste a duração das suas sessões de foco e descanso.</p>
                        </div>

                        {/* O FORMULÁRIO LIGADO AO useForm */}
                        <form onSubmit={submit} className="space-y-6">

                            {/* CAMPO: TEMPO DE FOCO */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Minutos de Foco
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={data.pomodoro_focus_minutes}
                                    onChange={(e) => setData('pomodoro_focus_minutes', e.target.value)}
                                    className="w-full border-gray-300 focus:border-pomoblue-500 focus:ring-pomoblue-500 rounded-xl shadow-sm px-4 py-3"
                                />
                                {/* Mostra o erro de validação do Laravel em vermelho se existir */}
                                {errors.pomodoro_focus_minutes && <div className="text-red-500 text-sm mt-1">{errors.pomodoro_focus_minutes}</div>}
                            </div>

                            {/* CAMPO: TEMPO DE PAUSA */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Minutos de Pausa
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={data.pomodoro_break_minutes}
                                    onChange={(e) => setData('pomodoro_break_minutes', e.target.value)}
                                    className="w-full border-gray-300 focus:border-pomoblue-500 focus:ring-pomoblue-500 rounded-xl shadow-sm px-4 py-3"
                                />
                                {errors.pomodoro_break_minutes && <div className="text-red-500 text-sm mt-1">{errors.pomodoro_break_minutes}</div>}
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