import React, { useState } from 'react';
import { router } from '@inertiajs/react';

// Recebemos 'allTags' do pai para podermos listar elas na hora de editar!
export default function TaskItem({ task, allTags, toggleComplete, deleteTask }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    // Agora a memória de edição guarda um ARRAY de IDs de tags
    const [editTags, setEditTags] = useState(task.tags ? task.tags.map(t => t.id) : []);

    const saveEdit = () => {
        router.patch(`/tarefas/${task.id}`, { title: editTitle, tags: editTags }, {
            onSuccess: () => setIsEditing(false),
        });
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditTitle(task.title);
        setEditTags(task.tags ? task.tags.map(t => t.id) : []);
    };

    const toggleEditTag = (tagId) => {
        if (editTags.includes(tagId)) {
            setEditTags(editTags.filter(id => id !== tagId));
        } else {
            setEditTags([...editTags, tagId]);
        }
    };

    return (
        <li className="p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg flex flex-col sm:flex-row gap-3 items-center w-full min-h-[56px] transition-colors">

            {!isEditing && (
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => toggleComplete(task.id)}
                    className="form-checkbox h-5 w-5 text-pomoblue-600 rounded focus:ring-pomoblue-500 cursor-pointer flex-shrink-0"
                />
            )}

            {isEditing ? (
                // ========= MODO EDIÇÃO =========
                <div className="flex-1 w-full flex flex-col gap-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-pomoblue-500 text-gray-700 dark:text-gray-200 p-2"
                        autoFocus
                    />

                    {/* Botões de Tags para Edição */}
                    <div className="flex flex-wrap gap-1.5">
                        {allTags && allTags.map(tag => (
                            <button
                                type="button"
                                key={tag.id}
                                onClick={() => toggleEditTag(tag.id)}
                                className={`px-2 py-0.5 rounded text-xs font-bold border transition-all ${editTags.includes(tag.id)
                                        ? 'text-white shadow-sm scale-105'
                                        : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-600 dark:text-gray-400'
                                    }`}
                                style={editTags.includes(tag.id) ? { backgroundColor: tag.color, borderColor: tag.color } : {}}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                // ========= MODO LEITURA =========
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                    <span className={`break-all font-medium ${task.is_completed ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-200"}`}>
                        {task.title}
                    </span>

                    {/* TAGS ALINHADAS À DIREITA (Aonde ficava a Categoria velha) */}
                    {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:justify-end">
                            {task.tags.map(tag => (
                                <span
                                    key={tag.id}
                                    className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md text-white shadow-sm"
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ========= BOTÕES DE AÇÃO ========= */}
            <div className="flex gap-2 flex-shrink-0 ml-auto">
                {isEditing ? (
                    <>
                        <button onClick={saveEdit} className="text-green-600 hover:text-green-700 font-bold text-sm px-2 bg-green-50 dark:bg-green-900/30 rounded py-1">Salvar</button>
                        <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-bold text-sm px-2">Cancelar</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500 transition-colors p-1" title="Editar">
                            {/* Ícone Lápis (O mesmo de antes) */}
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                            {/* Ícone Lixeira (O mesmo de antes) */}
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}