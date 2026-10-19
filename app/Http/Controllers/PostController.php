<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $posts = Post::query()
            ->with(['user:id,name', 'category:id,name'])
            ->when(
                $request->user()->role !== 'admin',
                fn($query) => $query->where('user_id', $request->user()->id)
            )
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('posts/pages/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('posts/pages/Create', [
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'content' => ['required', 'string'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $baseSlug = Str::slug($validated['title']);

        if ($baseSlug === '') {
            return back()->withErrors([
                'title' => 'Title must produce a valid slug.',
            ]);
        }

        $slug = $baseSlug;
        $counter = 2;

        while (Post::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $coverPath = $request->hasFile('cover_image')
            ? $request->file('cover_image')->store('posts/covers', 'public')
            : null;

        try {
            $request->user()->posts()->create([
                'category_id' => $validated['category_id'],
                'title' => $validated['title'],
                'slug' => $slug,
                'content' => $validated['content'],
                'status' => $validated['status'],
                'cover_image' => $coverPath,
            ]);
        } catch (\Throwable $e) {
            if ($coverPath) {
                Storage::disk('public')->delete($coverPath);
            }

            throw $e;
        }

        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        Gate::authorize('update', $post);

        return Inertia::render('posts/pages/Edit', [
            'post' => $post->load(['category:id,name', 'user:id,name']),
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'content' => ['required', 'string'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $baseSlug = Str::slug($validated['title']);

        if ($baseSlug === '') {
            return back()->withErrors([
                'title' => 'Title must produce a valid slug.',
            ]);
        }

        $slug = $baseSlug;
        $counter = 2;

        while (
            Post::query()
            ->where('slug', $slug)
            ->where('id', '!=', $post->id)
            ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $oldCoverPath = $post->cover_image;

        $newCoverPath = $request->hasFile('cover_image')
            ? $request->file('cover_image')->store('posts/covers', 'public')
            : null;

        try {
            $post->update([
                'title' => $validated['title'],
                'slug' => $slug,
                'category_id' => $validated['category_id'],
                'content' => $validated['content'],
                'status' => $validated['status'],
                'cover_image' => $newCoverPath ?? $oldCoverPath,
            ]);
        } catch (\Throwable $e) {
            if ($newCoverPath) {
                Storage::disk('public')->delete($newCoverPath);
            }

            throw $e;
        }

        if ($newCoverPath && $oldCoverPath) {
            Storage::disk('public')->delete($oldCoverPath);
        }

        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('delete', $post);

        $coverPath = $post->cover_image;

        $post->delete();

        if ($coverPath) {
            Storage::disk('public')->delete($coverPath);
        }

        return redirect()->route('posts.index');
    }
    
    public function preview(Post $post): Response
    {
        Gate::authorize('view', $post);

        return Inertia::render('posts/pages/Preview', [
            'post' => $post->load([
                'user:id,name',
                'category:id,name',
            ]),
        ]);
    }
}
