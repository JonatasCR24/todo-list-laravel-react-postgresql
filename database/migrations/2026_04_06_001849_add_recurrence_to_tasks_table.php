<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            // Criamos uma coluna de texto. O padrão é 'none' (Nenhuma).
            // Opções futuras: 'daily' (Diária), 'weekly' (Semanal), 'monthly' (Mensal).
            $table->string('recurrence')->default('none')->after('due_date');
        });
    }

    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('recurrence');
        });
    }
};
