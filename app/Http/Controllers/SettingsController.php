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
            'lofi_focus_id' => 'nullable|string|max:50',
            'lofi_break_id' => 'nullable|string|max:50',
        ]);

        $preferences = UserPreference::where('user_id', Auth::id())->first();

        $preferences->update([
            'pomodoro_focus_minutes' => $request->pomodoro_focus_minutes,
            'pomodoro_break_minutes' => $request->pomodoro_focus_minutes,
            'lofi_focus_id' => $request->lofi_focus_id,
            'lofi_break_id' => $request->lofi_break_id,
        ]);

        return redirect()->back()->with('success', 'Preferências atualizadas com sucesso!');
    }
}
