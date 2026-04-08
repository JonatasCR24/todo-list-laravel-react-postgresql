<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())
            ->with('tags')
            // A mágica de ordenação inteligente do PostgreSQL:
            ->orderByRaw('due_date ASC NULLS LAST')
            ->latest() // Desempata colocando as criadas mais recentemente no topo
            ->get();

        $tags = Tag::where('user_id', Auth::id())->get();

        return Inertia::render('TodoList', [
            'tasks' => $tasks,
            'tags' => $tags,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'due_date' => 'nullable|date',
            'recurrence' => 'nullable|string|in:none,daily,weekly,monthly',
        ]);

        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'due_date' => $request->due_date,
            'recurrence' => $request->recurrence ?? 'none',
        ]);

        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }

        return redirect()->back()->with('success', 'Tarefa adicionada com sucesso!');
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Acesso não autorizado.');
        }

        if ($request->has('title')) {
            $request->validate([
                'title' => 'required|string|max:255',
                'tags' => 'nullable|array',
                'tags.*' => 'exists:tags,id',
                'due_date' => 'nullable|date',
                'recurrence' => 'nullable|string|in:none,daily,weekly,monthly',
            ]);

            $task->update([
                'title' => $request->title,
                'due_date' => $request->due_date,
                'recurrence' => $request->recurrence ?? 'none',
            ]);

            if ($request->has('tags') && is_array($request->tags)) {
                $task->tags()->sync($request->tags);
            } else {
                $task->tags()->detach();
            }
        } else {
            $wasPending = !$task->is_completed;

            $task->update(['is_completed' => !$task->is_completed]);

            if ($wasPending && $task->recurrence !== 'none' && $task->due_date) {

                $newTask = $task->replicate();

                $nextDate = Carbon::parse($task->due_date);

                if ($task->recurrence === 'daily') {
                    $nextDate->addDay();
                } elseif ($task->recurrence === 'weekly') {
                    $nextDate->addWeek();
                } elseif ($task->recurrence === 'monthly') {
                    $nextDate->addMonth();
                }

                $newTask->is_completed = false;
                $newTask->due_date = $nextDate;
                $newTask->save();

                if ($task->tags->count() > 0) {
                    $newTask->tags()->attach($task->tags->pluck('id'));
                }
            }
        }

        return redirect()->back()->with('success', 'Tarefa atualizada com sucesso!');
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Acesso não autorizado. Essa tarefa não é sua!');
        }

        $task->delete();

        return redirect()->back()->with('success', 'Tarefa eliminada com sucesso!');
    }
}
