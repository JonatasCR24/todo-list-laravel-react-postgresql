<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Tag;


class TagController extends Controller
{
    //func pra criar uma tag nova
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:20',
            'color' => 'required|string|size:7', //7 pq é hexadecimal
        ]);

        Tag::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'Tag criada com sucesso!');
    }

    public function destroy(Tag $tag)
    {
        if ($tag->user_id !== Auth::id()) {
            abort(403, 'Acesso negado.');
        }

        $tag->delete();

        return redirect()->back()->with('success', 'Tag deletada!');
    }
}
