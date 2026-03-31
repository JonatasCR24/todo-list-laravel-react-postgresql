<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Importamos o "Motoboy" do React

use App\Models\Task;
use App\Models\Tag;

use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Função para MOSTRAR a tela e as tarefas
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->with('tags')->latest()->get();

        $tags = Tag::where('user_id', Auth::id())->get();

        // Manda o React renderizar a tela TodoList e entrega a variável $tasks para ela
        return Inertia::render('TodoList', [
            'tasks' => $tasks,
            'tags' => $tags,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',

            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);


        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'category' => $request->category,
        ]);

        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }

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
