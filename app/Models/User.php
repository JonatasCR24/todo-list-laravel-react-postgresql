<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail; pq que essa linha tá comentada pelo laravel??
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'bio',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tasks() //"Este usuário tem várias tarefas"
    {
        return $this->hasMany(Task::class);
    }

    public function pomodoroSessions() //"Este usuário tem várias sessões de pomodoro"
    {
        return $this->hasMany(PomodoroSession::class);
    }
}
