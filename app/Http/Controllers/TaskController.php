<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task; // Importamos o nosso Representante do Banco
use Inertia\Inertia; // Importamos o "Motoboy" do React

class TaskController extends Controller
{
    // Função para MOSTRAR a tela e as tarefas
    public function index()
    {
        $tasks = Task::all(); // Equivale a "SELECT * FROM tasks"
        
        // Manda o React renderizar a tela TodoList e entrega a variável $tasks para ela
        return Inertia::render('TodoList', [
            'tasks' => $tasks 
        ]);
    }

    // Função para SALVAR uma nova tarefa
    public function store(Request $request)
    {
        // 1. Validação (Garante que não enviaram uma tarefa vazia)
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // 2. Salva no banco de dados (Equivale ao INSERT INTO)
        Task::create([
            'title' => $request->title,
        ]);

        // 3. Atualiza a tela sem piscar (Magia do Inertia)
        return redirect()->back();
    }
}