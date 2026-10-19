<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $categories = Category::query()
            ->latest()
            ->get();

        return Inertia::render('categories/pages/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
        ]);

        $slug = Str::slug($validated['name']);

        if ($slug === '') {
            return back()->withErrors([
                'name' => 'Nama kategori harus menghasilkan slug yang valid.',
            ]);
        }

        if (Category::where('slug', $slug)->exists()) {
            return back()->withErrors([
                'name' => 'Kategori dengan slug tersebut sudah ada.',
            ]);
        }

        Category::create([
            'name' => $validated['name'],
            'slug' => $slug,
        ]);

        return redirect()->route('categories.index');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')->ignore($category->id),
            ],
        ]);

        $slug = Str::slug($validated['name']);

        if ($slug === '') {
            return back()->withErrors([
                'name' => 'Nama kategori harus menghasilkan slug yang valid.',
            ]);
        }

        $slugExists = Category::query()
            ->where('slug', $slug)
            ->where('id', '!=', $category->id)
            ->exists();

        if ($slugExists) {
            return back()->withErrors([
                'name' => 'Kategori dengan slug tersebut sudah ada.',
            ]);
        }

        $category->update([
            'name' => $validated['name'],
            'slug' => $slug,
        ]);

        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        if ($category->posts()->exists()) {
            return back()->withErrors([
                'delete' => 'Kategori tidak dapat dihapus karena masih digunakan oleh postingan.',
            ]);
        }

        $category->delete();

        return redirect()->route('categories.index');
    }
}
