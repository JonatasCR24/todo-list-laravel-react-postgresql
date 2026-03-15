import React from 'react';
import { Head } from '@inertiajs/react';

export default function TodoList() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
            {/* O componente Head muda o título da aba do navegador */}
            <Head title="Minhas Tarefas" />

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    ✅ Olá, To-Do List!
                </h1>
                <p className="text-gray-600 text-center">
                    Minha primeira tela em React rodando dentro do Laravel.
                </p>
            </div>
        </div>
    );
}