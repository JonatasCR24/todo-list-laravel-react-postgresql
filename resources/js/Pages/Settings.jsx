import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Settings() {

    const { auth, preferences, flash, tags } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        pomodoro_focus_minutes: preferences?.pomodoro_focus_minutes || 25,
        pomodoro_break_minutes: preferences?.pomodoro_break_minutes || 5,
        lofi_focus_id: preferences?.lofi_focus_id || '',
        lofi_break_id: preferences?.lofi_break_id || '',
    });

    const { data: tagData, setData: setTagData, post: postTag, processing: tagProcessing, errors: tagErrors, reset: resetTag } = useForm({
        name: '',
        color: '#3B82F6', // Azul padrão
    });

    const submitNewTag = (e) => {
        e.preventDefault();
        postTag('/tags', {
            preserveScroll: true, // Não deixa a página pular pro topo
            onSuccess: () => resetTag('name'), // Limpa o campo de texto se der certo
        });
    };

    const deleteTag = (id) => {
        if (confirm('Tem certeza que deseja excluir esta categoria? As tarefas que a usam não serão apagadas, apenas perderão a etiqueta.')) {
            router.delete(`/tags/${id}`, { preserveScroll: true });
        }
    };

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

                        <div className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-5">
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

                        {/*GERENCIAR CATEGORIAS (TAGS): */}

                        <div className="border-t border-gray-100 dark:border-gray-800 pt-10">
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">🏷️ Minhas Categorias</h3>
                                <p className="text-gray-500 mt-1 dark:text-gray-400">Crie etiquetas customizadas para organizar suas tarefas do seu jeito.</p>
                            </div>

                            {/* FORMULÁRIO DE CRIAR NOVA TAG */}
                            <form onSubmit={submitNewTag} className="flex flex-col sm:flex-row gap-3 mb-8 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">

                                {/* Input do Nome */}
                                <input
                                    type="text"
                                    placeholder="Nome da categoria (ex: Faculdade)"
                                    value={tagData.name}
                                    onChange={(e) => setTagData('name', e.target.value)}
                                    maxLength="20"
                                    required
                                    className="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:border-pomoblue-500 focus:ring-pomoblue-500 rounded-xl shadow-sm px-4 py-2"
                                />

                                {/* Input da Cor (Color Picker nativo do HTML) */}
                                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-2 shadow-sm">
                                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400 pl-2">Cor:</label>
                                    <input
                                        type="color"
                                        value={tagData.color}
                                        onChange={(e) => setTagData('color', e.target.value)}
                                        className="h-8 w-10 cursor-pointer bg-transparent border-0 p-0"
                                    />
                                </div>

                                {/* Botão de Adicionar */}
                                <button
                                    type="submit"
                                    disabled={tagProcessing}
                                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-2 px-6 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md disabled:opacity-50 whitespace-nowrap"
                                >
                                    + Adicionar
                                </button>
                            </form>
                            {tagErrors.name && <div className="text-red-500 text-sm mb-4">{tagErrors.name}</div>}

                            {/* LISTA DAS TAGS EXISTENTES */}
                            <div className="flex flex-wrap gap-3">
                                {tags && tags.length > 0 ? (
                                    tags.map(tag => (
                                        <div
                                            key={tag.id}
                                            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-sm text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                                            style={{ backgroundColor: tag.color }}
                                        >
                                            <span>{tag.name}</span>

                                            {/* Botão de Deletar (X) que aparece no Hover */}
                                            <button
                                                onClick={() => deleteTag(tag.id)}
                                                className="ml-1 opacity-60 hover:opacity-100 transition-opacity focus:outline-none bg-black/20 rounded-full w-5 h-5 flex items-center justify-center"
                                                title="Excluir categoria"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 italic text-sm">Você ainda não criou nenhuma categoria.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}