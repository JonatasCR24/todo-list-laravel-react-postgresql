<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PomodoroSession extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'duration_minutes', 'type'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
