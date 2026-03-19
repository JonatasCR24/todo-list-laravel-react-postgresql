import React, { useState } from 'react';
import { router } from '@inertiajs/react';

// O componente recebe a tarefa específica e as funções do pai (TodoList) via "props"
export default function TaskItem({ task, toggleComplete, deleteTask }) {

    const [isEditing, setIsEditing] = useState(false);
    // memoria de edicao do titulo
    const [editTitle, setEditTitle] = useState(task.title);

    // memoria de edicao da categoria 
    const [editCategory, setEditCategory] = useState(task.category);

    // Função que salva a edição desta tarefa específica
    const saveEdit = () => {
        router.patch(`/tarefas/${task.id}`, { title: editTitle, category: editCategory }, {
            onSuccess: () => setIsEditing(false), // Sai do modo de edição se der sucesso
        });
    };

    // Função para cancelar a edição
    const cancelEditing = () => {
        setIsEditing(false);
        setEditTitle(task.title); // Restaura o título original
        setEditCategory(task.category); // Restaura a categoria original
    };

    return (
        <li className="p-3 bg-gray-50 border border-gray-200 rounded-md flex gap-3 items-center w-full min-h-[56px]">

            {/* O NOSSO CHECKBOX VOLTOU AQUI! */}
            {!isEditing && (
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => toggleComplete(task.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                />
            )}

            {/* ÁREA DO TEXTO OU INPUT */}
            {isEditing ? (
                // MODO EDIÇÃO: Mostra o input de texto E o select de categoria lado a lado
                <div className="flex-1 flex flex-wrap gap-2">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-1"
                        autoFocus
                    />
                    <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-1"
                    >
                        <option value="Geral">Geral</option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Estudos">Estudos</option>
                        <option value="Casa">Casa</option>
                    </select>
                </div>
            ) : (
                // MODO LEITURA: Mostra o título e a etiqueta (badge) da categoria
                <div className="flex-1 flex items-center justify-between gap-4">
                    <span className={`break-all ${task.is_completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {task.title}
                    </span>

                    {/* Aqui está a etiqueta da Categoria! */}
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
                        {task.category}
                    </span>
                </div>
            )}

            {/* BOTÕES */}
            <div className="flex gap-2 flex-shrink-0">
                {isEditing ? (
                    <>
                        <button onClick={saveEdit} className="text-green-600 hover:text-green-800 font-semibold text-sm px-2">
                            Salvar
                        </button>
                        <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700 font-semibold text-sm px-2">
                            Cancelar
                        </button>
                    </>
                ) : (
                    <>
                        {/* Botão de Lápis (Editar) */}
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 transition-colors p-1" title="Editar tarefa">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>

                        {/* Botão de Lixeira (Eliminar) */}
                        <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 transition-colors p-1" title="Eliminar tarefa">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}