<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            // Nova linha: Cria a coluna user_id e já faz o FOREIGN KEY ligando com a tabela users
            // O onDelete('cascade') garante que se o usuário for deletado, as tarefas dele também somem.
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('title');
            $table->boolean('is_completed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
