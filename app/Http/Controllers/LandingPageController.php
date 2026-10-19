<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function index(): Response
    {
        $latestPosts = Post::query()
            ->with(['user:id,name', 'category:id,name'])
            ->where('status', 'published')
            ->latest()
            ->limit(3)
            ->get([
                'id',
                'user_id',
                'category_id',
                'title',
                'slug',
                'excerpt',
                'cover_image',
                'created_at',
            ]);

        return Inertia::render('home/pages/LandingPage', [
            'latestPosts' => $latestPosts,
        ]);
    }
}
