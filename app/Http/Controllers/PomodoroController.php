<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PomodoroSession;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class PomodoroController extends Controller
{

    // function index
    public function index()
    {
        $userId = Auth::id();

        $totalFocusMinutes = PomodoroSession::where('user_id', $userId)->where('type', 'focus')->sum('duration_minutes');

        $totalSessions = PomodoroSession::where('user_id', $userId)->where('type', 'focus')->count();

        return Inertia::render('Pomodoro', [
            'totalFocusMinutes' => $totalFocusMinutes,
            'totalSessions' => $totalSessions,
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'duration_minutes' => 'required|integer|min:1',
            'type' => 'required|string|in:focus,short_break',
        ]);

        PomodoroSession::create([
            'user_id' => Auth::id(),
            'duration_minutes' => $request->duration_minutes,
            'type' => $request->type,
        ]);

        return redirect()->back()->with('success', 'Sessão de pomodoro registrada com sucesso!');
    }
}
