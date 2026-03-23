<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TaskController;
use App\Http\Controllers\PomodoroController;
use App\Http\Controllers\SettingsController;

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


// Tudo que estiver dentro desse group só pode ser acessado por quem estiver logado (middleware('auth'))
Route::middleware('auth')->group(function () {

    // Rotas para editar, atualizar e deletar o perfil do usuário:

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rotas para gerenciar tarefas
    Route::get('/tarefas', [TaskController::class, 'index']); // Quando ENTRAR na página, roda a função index
    Route::post('/tarefas', [TaskController::class, 'store']); // Quando ENVIAR o formulário, roda a função store
    Route::patch('/tarefas/{task}', [TaskController::class, 'update']); // Quando ALTERAR o formulário, roda a função update
    Route::delete('/tarefas/{task}', [TaskController::class, 'destroy']); // Quando EXCLUIR uma tarefa, roda a função destroy

    // Rotas para gerenciar sessões de pomodoro
    Route::get('/pomodoro', [PomodoroController::class, 'index']);
    Route::post('/pomodoro/session', [PomodoroController::class, 'store'])->name('pomodoro.store');

    // Rotas para gerenciar configurações do usuário
    Route::get('/configuracoes', [SettingsController::class, 'edit'])->name('settings.edit');
    Route::put('/configuracoes', [SettingsController::class, 'update'])->name('settings.update');
});


require __DIR__ . '/auth.php';
