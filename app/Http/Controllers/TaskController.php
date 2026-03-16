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
        //$tasks = Task::all(); // Equivale a "SELECT * FROM tasks"
        
        $tasks = Task::latest()->get(); // Equivale a "SELECT * FROM tasks ORDER BY created_at DESC"

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

    // Função para ATUALIZAR (Concluir/Desfazer tarefa)
    public function update(Task $task)
    {

        // Inverte o estado atual. Se era false (0), vira true (1). Se era true, vira false.
        $task->update([
            'is_completed' => !$task->is_completed
        ]);

        // Devolve a resposta para o React atualizar o ecrã
        return redirect()->back();
    }

    // Função para ELIMINAR uma tarefa
    public function destroy(Task $task)
    {
        // Equivale a "DELETE FROM tasks WHERE id = ?"
        $task->delete();

        return redirect()->back();
    }
}
