<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\UserPreference;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

use App\Models\Tag;
use App\Models\User;

class SettingsController extends Controller
{
    public function edit()
    {
        $userId = Auth::id();
        $preferences = UserPreference::firstOrCreate(['user_id' => $userId]);

        $tags = Tag::where('user_id', $userId)->get();

        if (!$preferences) {
            $preferences = UserPreference::create([
                'user_id' => $userId,
                'pomodoro_focus_minutes' => 25,
                'pomodoro_break_minutes' => 5,
            ]);
        }

        return Inertia::render('Settings', [
            'preferences' => $preferences,
            'tags' => $tags
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
            'pomodoro_break_minutes' => $request->pomodoro_break_minutes,
            'lofi_focus_id' => $request->lofi_focus_id,
            'lofi_break_id' => $request->lofi_break_id,
        ]);

        return redirect()->back()->with('success', 'Preferências atualizadas com sucesso!');
    }
}
