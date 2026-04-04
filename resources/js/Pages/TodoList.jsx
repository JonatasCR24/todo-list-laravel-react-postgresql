import React, { useEffect } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TaskItem from '@/Components/TaskItem';

export default function TodoList({ tasks, tags }) {

    const [currentFilter, setCurrentFilter] = React.useState('Todas');

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        tags: [],
        due_date: '',
    });

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'Todas') return true;
        return task.tags && task.tags.some(t => t.name === currentFilter);
    });

    const toggleTag = (tagId) => {
        if (data.tags.includes(tagId)) {
            setData('tags', data.tags.filter(id => id !== tagId));
        } else {
            setData('tags', [...data.tags, tagId]);
        }
    };

    const { flash, auth } = usePage().props;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/tarefas', {
            onSuccess: () => {
                reset('title');
                reset('due_date');
                // Opcional: reset('tags') se quiser limpar as tags selecionadas após criar a tarefa
            },
        });
    };

    const toggleComplete = (id) => {
        router.patch(`/tarefas/${id}`);
    };

    const deleteTask = (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deletar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/tarefas/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-200">Minhas Tarefas</h2>}
        >
            <Head title="Minhas Tarefas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">

                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl dark:border-gray-900 dark:bg-gray-800 transition-colors duration-300">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
                            Lista de Tarefas
                        </h1>

                        {/* FORMULÁRIO REESTRUTURADO */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">

                            {/* Linha 1: Input e Data e Botão */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="O que você precisa fazer?"
                                    className="flex-1 dark:text-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:border-pomoblue-500 focus:ring-pomoblue-500"
                                    required
                                />

                                <input
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="w-full sm:w-auto dark:text-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:border-pomoblue-500 focus:ring-pomoblue-500 cursor-pointer"
                                />

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto whitespace-nowrap bg-pomoblue-600 hover:bg-pomoblue-700 text-white font-bold py-2 px-6 rounded transition-colors shadow-sm"
                                >
                                    Adicionar
                                </button>
                            </div>

                            {/* Linha 2: Seletor de Tags (Só aparece se o usuário tiver tags criadas) */}
                            {tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 items-center px-1">
                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 mr-1">Tags:</span>
                                    {tags.map(tag => (
                                        <button
                                            type="button"
                                            key={tag.id}
                                            onClick={() => toggleTag(tag.id)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${data.tags.includes(tag.id)
                                                ? 'text-white shadow-md scale-105 border-transparent'
                                                : 'bg-transparent text-gray-500 border border-gray-300 dark:border-gray-600 dark:text-gray-400'
                                                }`}
                                            style={data.tags.includes(tag.id) ? { backgroundColor: tag.color } : {}}
                                        >
                                            {tag.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </form>

                        {/* BARRA DE FILTROS DINÂMICA */}
                        <div className="flex flex-wrap gap-2 mb-6 justify-center border-b border-gray-200 dark:border-gray-600 pb-4">

                            {/* Botão Fixo "Todas" */}
                            <button
                                onClick={() => setCurrentFilter('Todas')}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${currentFilter === 'Todas'
                                    ? 'bg-pomoblue-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-200'
                                    }`}
                            >
                                Todas
                            </button>

                            {/* Botões Dinâmicos: Gerados a partir do banco de dados */}
                            {tags && tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => setCurrentFilter(tag.name)}
                                    style={currentFilter === tag.name ? { backgroundColor: tag.color, color: 'white' } : {}}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${currentFilter === tag.name
                                        ? 'shadow-md'
                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-200'
                                        }`}
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>

                        {/* LISTA DE TAREFAS */}
                        <ul className="space-y-3">
                            {filteredTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    allTags={tags} // 👈 O SEGREDO ESTÁ AQUI: Passamos a lista de tags pro filho!
                                    toggleComplete={toggleComplete}
                                    deleteTask={deleteTask}
                                />
                            ))}

                            {filteredTasks.length === 0 && (
                                <p className="text-sm text-gray-500 text-center italic py-4">
                                    Nenhuma tarefa encontrada para este filtro.
                                </p>
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
};