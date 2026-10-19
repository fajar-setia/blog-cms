<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use App\Models\Category;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/pages/Dashboard', [
            'stats' => [
                'totalPosts' => Post::count(),
                'publishedPosts' => Post::where('status', 'published')->count(),
                'draftPosts' => Post::where('status', 'draft')->count(),
                'totalCategories' => Category::count(),
                'totalUsers' => User::count(),
            ],

            'recentPosts' => Post::query()
                ->with([
                    'user:id,name',
                    'category:id,name',
                ])
                ->latest()
                ->limit(5)
                ->get([
                    'id',
                    'user_id',
                    'category_id',
                    'title',
                    'status',
                    'created_at',
                ]),
        ]);
    }
}
