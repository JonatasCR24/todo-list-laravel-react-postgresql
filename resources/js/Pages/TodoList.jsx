import React, { useEffect } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TaskItem from '@/Components/TaskItem'; //componente dos itens da lista

// O PHP enviou a variável $tasks, o React recebe ela aqui como propriedade (props)
export default function TodoList({ tasks }) {

    // O useForm é o "motoboy" do Inertia para formulários
    const { data, setData, post, processing, reset } = useForm({
        title: '', // Cria a variável title começando vazia
    });

    // captura as mensagens 'flas'h do Laravel (como 'success' ou 'error') para mostrar alertas
    const { flash, auth } = usePage().props; // auth é o objeto que tem os dados do usuário autenticado

    // fica de olho nas mensagens flash e mostra um alerta usando SweetAlert2 sempre que uma nova mensagem chegar
    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                toast: true, // Faz o alerta parecer um "toast" (pequeno e no canto)
                position: 'top-end', // Posiciona no canto superior direito
                icon: 'success', // Ícone de sucesso (verde)
                title: flash.success, // O texto da mensagem de sucesso
                showConfirmButton: false, // Esconde o botão "OK"
                timer: 3000, // Fecha o alerta automaticamente após 3 segundos
                timerProgressBar: true, // Mostra uma barra de progresso do tempo
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Minhas Tarefas</h2>}
        >
            <Head title="Minhas Tarefas" />

            {/* O miolo da página, mantendo o fundo e o espaçamento padrão do sistema */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">

                    {/* AQUI COMEÇA O SEU QUADRADO BRANCO EXATAMENTE COMO ERA */}
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                            Lista de Tarefas (Laravel Sail)
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
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    toggleComplete={toggleComplete}
                                    deleteTask={deleteTask}
                                />
                            ))}

                            {tasks.length === 0 && (
                                <p className="text-sm text-gray-500 text-center italic">
                                    Nenhuma tarefa ainda. Adicione a primeira!
                                </p>
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
};
