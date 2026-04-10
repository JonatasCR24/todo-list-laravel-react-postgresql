<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();


        $completedCount = Task::where('user_id', $userId)
            ->where('is_completed', true)
            ->count();

        $pendingCount = Task::where('user_id', $userId)
            ->where('is_completed', false)
            ->count();

        $lateCount = Task::where('user_id', $userId)
            ->where('is_completed', false)
            ->whereNotNull('due_date')
            ->whereDate('due_date', '<', Carbon::today())
            ->count();

        return Inertia::render('Dashboard', [
            'stats' => [
                'completed' => $completedCount,
                'pending' => $pendingCount,
                'late' => $lateCount,
            ]
        ]);
    }
}
