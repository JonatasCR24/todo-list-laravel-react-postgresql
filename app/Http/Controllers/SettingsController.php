<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\UserPreference;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class SettingsController extends Controller
{
    public function edit()
    {
        $userId = Auth::id();
        $preferences = UserPreference::firstOrCreate(['user_id' => $userId]);

        return Inertia::render('Settings', [
            'preferences' => $preferences,
        ]);
    }

    public function update(Request $request)
    {
        $userId = Auth::id();

        $request->validate([
            'pomodoro_focus_minutes' => 'required|integer|min:1|max:999',
            'pomodoro_break_minutes' => 'required|integer|min:1|max:999',
        ]);

        $preferences = UserPreference::updateOrCreate(
            ['user_id' => $userId],
            [
                'pomodoro_focus_minutes' => $request->pomodoro_focus_minutes,
                'pomodoro_break_minutes' => $request->pomodoro_break_minutes,
            ]
        );

        return redirect()->back()->with('success', 'Preferências atualizadas com sucesso!');
    }
}
