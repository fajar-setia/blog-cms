<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;

class BerandaController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = Post::query()
            ->where('user_id', $request->user()->id);

        return Inertia::render('beranda/pages/Index', [
            'stats' => [
                'total' => (clone $posts)->count(),
                'published' => (clone $posts)
                    ->where('status', 'published')
                    ->count(),
                'draft' => (clone $posts)
                    ->where('status', 'draft')
                    ->count(),
            ],

            'recentPosts' => (clone $posts)
                ->with('category:id,name')
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
