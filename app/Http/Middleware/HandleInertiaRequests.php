<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [

            // Compartilha os dados do usuário logado com o React, para que ele saiba quem é o usuário
            'auth' => [
                'user' => $request->user(),
            ],

            // Isso garante que todas as mensagens 'success' sejam enviadas para o React
            'flash' => [
                'success' => fn() => $request->session()->get('success')
            ],
        ]);
    }
}
