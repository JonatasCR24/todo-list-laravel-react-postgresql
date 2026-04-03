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
        // 1. Validamos apenas o título e o array de tags
        $request->validate([
            'title' => 'required|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // 2. Criamos a tarefa sem a categoria
        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
        ]);

        // 3. Sincronizamos as tags
        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }

        return redirect()->back()->with('success', 'Tarefa adicionada com sucesso!');
    }

    // Função para ATUALIZAR (Concluir/Desfazer ou Editar Título e Tags)
    public function update(Request $request, Task $task)
    {
        // TRAVA DE SEGURANÇA
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Acesso não autorizado. Essa tarefa não é sua!');
        }

        // Se o React enviou um 'title', significa que é uma Edição de Texto/Tags
        if ($request->has('title')) {
            $request->validate([
                'title' => 'required|string|max:255',
                'tags' => 'nullable|array',
                'tags.*' => 'exists:tags,id',
            ]);

            // Atualiza o título
            $task->update([
                'title' => $request->title,
            ]);

            // Sincroniza as tags (Se vier vazio, ele apaga as tags antigas usando o detach)
            if ($request->has('tags') && is_array($request->tags)) {
                $task->tags()->sync($request->tags);
            } else {
                $task->tags()->detach();
            }
        } else {
            // Se não enviou 'title', é apenas o clique no Checkbox para concluir/desfazer
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
