<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PublicPostController extends Controller
{
     public function index(): Response
    {
        $posts = Post::query()
            ->with(['user:id,name', 'category:id,name'])
            ->where('status', 'published')
            ->latest()
            ->paginate(9);

        return Inertia::render('blog/pages/Index', [
            'posts' => $posts,
        ]);
    }
    public function show(string $slug): Response
    {
        $post = Post::query()
            ->with(['user:id,name', 'category:id,name'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('blog/pages/Show', [
            'post' => $post,
        ]);
    }
}
