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
        return Inertia::render('Pomodoro');
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

        return redirect()->back();
    }
}
