import React from 'react';
import { Head, useForm } from '@inertiajs/react';

// O PHP enviou a variável $tasks, o React recebe ela aqui como propriedade (props)
export default function TodoList({ tasks }) {
    
    // O useForm é o "motoboy" do Inertia para formulários
    const { data, setData, post, processing, reset } = useForm({
        title: '', // Cria a variável title começando vazia
    });

    // Função que roda quando o usuário clica em "Adicionar"
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede a página de dar F5 sozinha (comportamento padrão do HTML)
        
        // Envia os dados via POST para a nossa rota do PHP
        post('/tarefas', {
            onSuccess: () => reset('title'), // Se o PHP salvar com sucesso, limpa o campo de texto
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
            <Head title="Minhas Tarefas" />

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    ✅ To-Do List Full Stack
                </h1>

                {/* FORMULÁRIO DE NOVA TAREFA */}
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
                        disabled={processing} // Desativa o botão enquanto estiver enviando
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Adicionar
                    </button>
                </form>

                {/* LISTA DE TAREFAS SALVAS NO BANCO */}
                <ul className="space-y-3">
                    {/* O map é o equivalente ao foreach do PHP, mas no JavaScript */}
                    {tasks.map((task) => (
                        <li key={task.id} className="p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                            {task.title}
                        </li>
                    ))}
                    
                    {/* Mensagem se o banco estiver vazio */}
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