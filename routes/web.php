<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TaskController;
use App\Http\Controllers\PomodoroController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\Auth\GoogleController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Tudo que estiver dentro desse group só pode ser acessado por quem estiver logado (middleware('auth'))
Route::middleware('auth')->group(function () {

    /* Antigamente:
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    */


    // Rotas para editar, atualizar e deletar o perfil do usuário:
    Route::controller(ProfileController::class)->prefix('profile')->group(function () {
        Route::get('/', 'edit')->name('profile.edit');
        Route::patch('/', 'update')->name('profile.update');
        Route::delete('/', 'destroy')->name('profile.destroy');
    });

    // Rotas para gerenciar tarefas
    Route::controller(TaskController::class)->prefix('tarefas')->group(function () {
        Route::get('/', 'index'); // Quando ENTRAR na página, roda a função index
        Route::post('/', 'store'); // Quando ENVIAR o formulário, roda a função store
        Route::patch('/{task}', 'update'); // Quando ALTERAR o formulário, roda a função update
        Route::delete('/{task}', 'destroy'); // Quando EXCLUIR uma tarefa, roda a função destroy
    });

    // Rotas para gerenciar sessões de pomodoro
    Route::controller(PomodoroController::class)->prefix('pomodoro')->group(function () {
        Route::get('/', 'index');
        Route::post('/session', 'store')->name('pomodoro.store');
    });

    // Rotas para gerenciar configurações do usuário
    Route::controller(SettingsController::class)->prefix('configuracoes')->group(function () {
        Route::get('/', 'edit')->name('settings.edit');
        Route::put('/', 'update')->name('settings.update');
    });

    // Rotas para gerenciar as tags:
    Route::controller(TagController::class)->prefix('tags')->group(function () {
        Route::post('/', 'store')->name('tags.store');
        Route::delete('/{tag}', 'destroy')->name('tags.destroy');
    });

    // Rotas para visualizar o ranking:
    // (Como é apenas uma rota, mantemos o formato original por simplicidade)
    Route::get('/ranking', [LeaderboardController::class, 'index'])->name('ranking');

    // Rotas do Google
    Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');
    Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
});

require __DIR__ . '/auth.php';
