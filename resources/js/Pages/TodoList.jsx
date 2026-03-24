import React, { useEffect } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TaskItem from '@/Components/TaskItem'; //componente dos itens da lista

// O PHP enviou a variável $tasks, o React recebe ela aqui como propriedade (props)
export default function TodoList({ tasks }) {

    const [currentFilter, setCurrentFilter] = React.useState('Todas');

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'Todas') return true;
        return task.category === currentFilter;
    });

    // O useForm é o "motoboy" do Inertia para formulários
    const { data, setData, post, processing, reset } = useForm({
        title: '', // variável title começando vazia
        category: 'Geral', // variável category começando com o valor padrão
    });

    // captura as mensagens 'flash' do Laravel (como 'success' ou 'error') para mostrar alertas
    const { flash, auth } = usePage().props; // auth é o objeto que tem os dados do usuário autenticado

    // fica de olho nas mensagens flash e mostra um alerta usando SweetAlert2 sempre que uma nova mensagem chegar
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
        // Antes de deletar, mostramos um alerta de confirmação usando SweetAlert2
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
            // Se o usuário clicar em "Sim, delete!", então enviamos a requisição DELETE para o Laravel
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

            {/* O miolo da página, mantendo o fundo e o espaçamento padrão do sistema */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">

                    {/* AQUI COMEÇA O SEU QUADRADO BRANCO EXATAMENTE COMO ERA */}
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                            Lista de Tarefas (Laravel Sail + React + PostgreSQL)
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="O que você precisa fazer?"
                                className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-pomoblue-500 focus:ring-pomoblue-500"
                                required
                            />
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full sm:w-auto border-gray-300 rounded-md shadow-sm focus:border-pomoblue-500 focus:ring-pomoblue-500"
                            >
                                <option value="Geral">Geral</option>
                                <option value="Trabalho">Trabalho</option>
                                <option value="Estudos">Estudos</option>
                                <option value="Casa">Casa</option>

                            </select>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto whitespace-nowrap bg-pomoblue-600 hover:bg-pomoblue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                Adicionar
                            </button>
                        </form>

                        {/* BARRA DE FILTROS */}
                        <div className="flex flex-wrap gap-2 mb-6 justify-center border-b border-gray-200 pb-4">
                            {['Todas', 'Geral', 'Trabalho', 'Estudos', 'Casa'].map((categoria) => (
                                <button
                                    key={categoria}
                                    onClick={() => setCurrentFilter(categoria)}
                                    className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${currentFilter === categoria
                                        ? 'bg-pomoblue-600 text-white shadow-sm' // Botão Ativo (Colorido)
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200' // Botão Inativo (Cinza)
                                        }`}
                                >
                                    {categoria}
                                </button>
                            ))}
                        </div>

                        <ul className="space-y-3">
                            {filteredTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    toggleComplete={toggleComplete}
                                    deleteTask={deleteTask}
                                />
                            ))}

                            {filteredTasks.length === 0 && (
                                <p className="text-sm text-gray-500 text-center italic">
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
