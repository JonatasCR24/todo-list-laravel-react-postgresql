<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // Liberamos o user_id para ser salvo no banco
    protected $fillable = ['title', 'is_completed', 'user_id'];
    
    // Dizemos ao laravel: "Esta tarefa pertence a um usuário"
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
