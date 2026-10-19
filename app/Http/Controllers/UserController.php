<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('users/pages/Index', [
            'users' => User::query()
                ->select('id', 'name', 'email', 'role', 'created_at')
                ->latest()
                ->paginate(10),

            'roleCounts' => [
                'admins' => User::where('role', 'admin')->count(),
                'authors' => User::where('role', 'author')->count(),
            ],
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', Rule::in(['admin', 'author'])],
        ]);

        if ($request->user()->is($user)) {
            return back()->withErrors([
                'role' => 'You cannot change your own role.',
            ]);
        }

        if (
            $user->role === 'admin' &&
            $validated['role'] === 'author' &&
            User::where('role', 'admin')->count() <= 1
        ) {
            return back()->withErrors([
                'role' => 'The last admin cannot be demoted.',
            ]);
        }

        $user->update([
            'role' => $validated['role'],
        ]);

        return back();
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->is($user)) {
            return back()->withErrors([
                'delete' => 'You cannot delete your own account.',
            ]);
        }

        if (
            $user->role === 'admin' &&
            User::where('role', 'admin')->count() <= 1
        ) {
            return back()->withErrors([
                'delete' => 'The last admin account cannot be deleted.',
            ]);
        }

        if ($user->posts()->exists()) {
            return back()->withErrors([
                'delete' => 'This user still has posts. Delete or reassign their posts first.',
            ]);
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}
