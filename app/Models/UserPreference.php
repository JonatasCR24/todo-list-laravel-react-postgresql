<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'pomodoro_focus_minutes', 
        'pomodoro_break_minutes',
        'lofi_focus_id',
        'lofi_break_id',
        'alarm_sound',
        ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
