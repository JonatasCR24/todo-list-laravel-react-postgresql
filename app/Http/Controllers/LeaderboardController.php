<?php

namespace App\Http\Controllers;

use App\Models\PomodoroSession;
use App\Models\User;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $topUsers = User::has('pomodoroSessions')
            ->withSum('pomodoroSessions', 'duration_minutes')
            ->orderByDesc('pomodoro_sessions_sum_duration_minutes')
            ->take(10)
            ->get();

        return Inertia::render('Leaderboard', [
            'topUsers' => $topUsers,
        ]);
    }
}
