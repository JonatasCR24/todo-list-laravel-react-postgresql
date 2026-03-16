import React, { useState} from 'react';
import { Head, useForm, router, } from '@inertiajs/react';

// O PHP enviou a variável $tasks, o React recebe ela aqui como propriedade (props)
export default function TodoList({ tasks }) {

    // O useForm é o "motoboy" do Inertia para formulários
    const { data, setData, post, processing, reset } = useForm({
        title: '', // Cria a variável title começando vazia
    });

    //guarda o id da tarefa que está sendo editada, ou null se nenhuma tarefa estiver sendo editada
    const [editingTaskId, setEditingTaskId] = useState(null);

    //guarda o texto do título da tarefa que está sendo editada
    const [editingTaskTitle, setEditingTaskTitle] = useState('');

    // funcao que roda quando starta a edição de uma tarefa
    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditingTaskTitle(task.title);
    };

    // funcao que cancela a edição de uma tarefa
    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingTaskTitle('');
    };

    // funcao que salva as alterações de uma tarefa editada (manda pro laravel)
    const saveEdit = (id) => {
        // envia o novo titulo para a mesma rota de update que já tinhamos
        router.patch(`/tarefas/${id}`, {
            title: editingTaskTitle, // o novo título da tarefa
        }, {
            onSuccess: () => cancelEditing(), // se der tudo certo, cancela o modo de edição
        });
    }

    // Função que roda quando o usuário clica em "Adicionar"
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede a página de dar F5 sozinha (comportamento padrão do HTML)

        // Envia os dados via POST para a nossa rota do PHP
        post('/tarefas', {
            onSuccess: () => reset('title'), // Se o PHP salvar com sucesso, limpa o campo de texto
        });
    };

    // Nova função: Dispara a rota PATCH do Laravel
    const toggleComplete = (id) => {
        router.patch(`/tarefas/${id}`);
    };


    // Nova função: Dispara a rota DELETE do Laravel
    const deleteTask = (id) => {
        router.delete(`/tarefas/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-20 px-4">
            <Head title="Minhas Tarefas" />

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    ✅ To-Do List Full Stack
                </h1>

                <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="O que você precisa fazer?"
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Adicionar
                    </button>
                </form>

                <ul className="space-y-3">
                    {tasks.map((task) => (
                        // Usamos flex e gap-3 para alinhar perfeitamente Checkbox -> Texto -> Lixeira
                        <li key={task.id} className="p-3 bg-gray-50 border border-gray-200 rounded-md flex gap-3 items-center w-full min-h-[56px]">

                            {/* CHECKBOX: Só aparece se não estivermos editando esta tarefa */}
                            {editingTaskId !== task.id && (
                                <input
                                    type="checkbox"
                                    checked={task.is_completed}
                                    onChange={() => toggleComplete(task.id)}
                                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                                />
                            )}

                            {/* ÁREA DO TEXTO OU INPUT DE EDIÇÃO */}
                            {editingTaskId === task.id ? (
                                // SE ESTIVER EDITANDO: Mostra o input
                                <input
                                    type="text"
                                    value={editingTaskTitle}
                                    onChange={(e) => setEditingTaskTitle(e.target.value)}
                                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-1"
                                    autoFocus
                                />
                            ) : (
                                // SE NÃO ESTIVER EDITANDO: Mostra o texto normal com break-all
                                <span className={`flex-1 break-all ${task.is_completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                                    {task.title}
                                </span>
                            )}

                            {/* ÁREA DOS BOTÕES DA DIREITA */}
                            <div className="flex gap-2 flex-shrink-0">

                                {editingTaskId === task.id ? (
                                    // BOTÕES QUANDO ESTÁ EDITANDO: Salvar (Verde) e Cancelar (Cinza)
                                    <>
                                        <button onClick={() => saveEdit(task.id)} className="text-green-600 hover:text-green-800 font-semibold text-sm px-2">
                                            Salvar
                                        </button>
                                        <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700 font-semibold text-sm px-2">
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    // BOTÕES NORMAIS: Editar (Lápis) e Eliminar (Lixeira)
                                    <>
                                        <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-700 transition-colors p-1" title="Editar tarefa">
                                            {/* Ícone de Lápis */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>

                                        <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 transition-colors p-1" title="Eliminar tarefa">
                                            {/* Ícone de Lixeira (Mantido igual) */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}

                    {tasks.length === 0 && (
                        <p className="text-sm text-gray-500 text-center italic">
                            Nenhuma tarefa ainda. Adicione a primeira!
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
}