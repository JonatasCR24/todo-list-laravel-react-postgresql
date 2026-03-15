<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/tarefas', [TaskController::class, 'index']); // Quando ENTRAR na página, roda a função index
Route::post('/tarefas', [TaskController::class, 'store']); // Quando ENVIAR o formulário, roda a função store
Route::patch('/tarefas/{task}', [TaskController::class, 'update']); // Quando ALTERAR o formulário, roda a função update
Route::delete('/tarefas/{task}', [TaskController::class, 'destroy']); // Quando EXCLUIR uma tarefa, roda a função destroy

require __DIR__.'/auth.php';
