import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TaskItem({ task, allTags, toggleComplete, deleteTask }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editTags, setEditTags] = useState(task.tags ? task.tags.map(t => t.id) : []);

    // 1. Memória de edição para a Data
    const [editDueDate, setEditDueDate] = useState(task.due_date ? task.due_date.substring(0, 10) : '');

    const [editRecurrence, setEditRecurrence] = useState(task.recurrence || 'none');

    const saveEdit = () => {
        router.patch(`/tarefas/${task.id}`, {
            title: editTitle,
            tags: editTags,
            due_date: editDueDate,
            recurrence: editRecurrence
        }, {
            onSuccess: () => setIsEditing(false),
        });
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditTitle(task.title);
        setEditTags(task.tags ? task.tags.map(t => t.id) : []);
        setEditDueDate(task.due_date || '');
        setEditRecurrence(task.recurrence || 'none');
    };

    const toggleEditTag = (tagId) => {
        if (editTags.includes(tagId)) {
            setEditTags(editTags.filter(id => id !== tagId));
        } else {
            setEditTags([...editTags, tagId]);
        }
    };

    // Formata a data e escolhe a cor de acordo com o prazo
    const getDueDateInfo = (dateString) => {
        if (!dateString) return null;

        // 1. O SEGREDO ESTÁ AQUI: Cortamos a string para garantir que temos apenas YYYY-MM-DD
        const cleanDate = dateString.substring(0, 10);

        // 2. Agora sim, adicionamos a hora zerada de forma limpa
        const date = new Date(cleanDate + 'T00:00:00');

        // Trava extra de segurança
        if (isNaN(date.getTime())) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Zera as horas para comparar só os dias

        const isLate = date < today;
        const isToday = date.getTime() === today.getTime();

        return {
            formatted: date.toLocaleDateString('pt-BR'),
            // Se for atrasada = Vermelho | Se for hoje = Amarelo | Se for futuro = Cinza
            colorClass: isLate ? 'text-red-500 font-bold' : (isToday ? 'text-yellow-600 dark:text-yellow-500 font-bold' : 'text-gray-500 dark:text-gray-400')
        };
    };

    const dueInfo = getDueDateInfo(task.due_date);

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
                //MODO EDIÇÃO
                <div className="flex-1 w-full flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="flex-1 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-pomoblue-500 text-gray-700 dark:text-gray-200 p-2"
                            autoFocus
                        />
                        {/* Campo de Data no modo edição */}
                        <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="w-full sm:w-auto dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-pomoblue-500 text-gray-700 dark:text-gray-200 p-2"
                        />
                        <select
                            value={editRecurrence}
                            onChange={(e) => setEditRecurrence(e.target.value)}
                            className="w-full sm:w-auto dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-pomoblue-500 text-gray-700 dark:text-gray-200 p-2 text-sm"
                        >
                            <option value="none">Uma vez</option>
                            <option value="daily">Diário</option>
                            <option value="weekly">Semanal</option>
                            <option value="monthly">Mensal</option>
                        </select>
                    </div>

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
                //MODO LEITURA
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                    <div className="flex flex-col">
                        <span className={`break-all font-medium ${task.is_completed ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-200"}`}>
                            {task.title}
                        </span>

                        <div className="flex flex-wrap gap-2 items-center mt-0.5">
                            {dueInfo && !task.is_completed && (
                                <span className={`text-xs ${dueInfo.colorClass}`}>
                                    📅 {dueInfo.formatted} {dueInfo.colorClass.includes('red') ? '(Atrasada)' : (dueInfo.colorClass.includes('yellow') ? '(Hoje)' : '')}
                                </span>
                            )}

                            {task.recurrence !== 'none' && !task.is_completed && (
                                <span className="text-[10px] font-bold text-pomoblue-600 dark:text-pomoblue-400 bg-pomoblue-50 dark:bg-pomoblue-900/30 px-1.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    {task.recurrence === 'daily' ? 'Diário' : task.recurrence === 'weekly' ? 'Semanal' : 'Mensal'}
                                </span>
                            )}
                        </div>
                    </div>

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

            <div className="flex gap-2 flex-shrink-0 ml-auto">
                {isEditing ? (
                    <>
                        <button onClick={saveEdit} className="text-green-600 hover:text-green-700 font-bold text-sm px-2 bg-green-50 dark:bg-green-900/30 rounded py-1">Salvar</button>
                        <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-bold text-sm px-2">Cancelar</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500 transition-colors p-1" title="Editar">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}