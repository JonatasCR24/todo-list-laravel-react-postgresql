<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task; // Importamos o nosso Representante do Banco
use Inertia\Inertia; // Importamos o "Motoboy" do React

use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Função para MOSTRAR a tela e as tarefas
    public function index()
    {
        //$tasks = Task::all(); // Equivale a "SELECT * FROM tasks"
        //$tasks = Task::latest()->get(); // Equivale a "SELECT * FROM tasks ORDER BY created_at DESC"

        
        //Pega apenas as tarefas do usuário logado, e ordena da mais nova para a mais antiga
        // Equivale a "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC"

        // 1. Dizemos explicitamente pro VS Code quem é esse usuário
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 2. Agora o VS Code tem certeza absoluta que o $user tem a função tasks()
        $tasks = $user->tasks()->latest()->get();


        // Manda o React renderizar a tela TodoList e entrega a variável $tasks para ela
        return Inertia::render('TodoList', [
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
        ]);

        // Dizemos explicitamente pro VS Code quem é esse usuário
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Agora salva a tarefa vinculada a ele sem linhas vermelhas
        $user->tasks()->create([
            'title' => $request->title,
            'category' => $request->category,
        ]);

        return redirect()->back()->with('success', 'Tarefa adicionada com sucesso!');
    }

    // Função para ATUALIZAR (Concluir/Desfazer ou Editar Título)
    public function update(Request $request, Task $task)
    {
        // TRAVA DE SEGURANÇA: O ID do dono da tarefa é diferente do ID do cara logado?
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Acesso não autorizado. Essa tarefa não é sua!');
        }

        if ($request->has('title')) {
            $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|string|max:255',
            ]);

            $task->update([
                'title' => $request->title,
                'category' => $request->category
            ]);
        } else {
            $task->update([
                'is_completed' => !$task->is_completed
            ]);
        }

        return redirect()->back()->with('success', 'Tarefa atualizada com sucesso!');
    }

    // Função para ELIMINAR uma tarefa
    public function destroy(Task $task)
    {
        // TRAVA DE SEGURANÇA: Impede que apaguem tarefas de outras pessoas
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Acesso não autorizado. Essa tarefa não é sua!');
        }

        $task->delete();

        return redirect()->back()->with('success', 'Tarefa eliminada com sucesso!');
    }
}
