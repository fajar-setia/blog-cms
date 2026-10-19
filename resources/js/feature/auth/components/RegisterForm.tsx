import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function RegisterForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/register', {
            onFinish: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium">
                    Name
                </label>

                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 w-full rounded-lg border p-3"
                    placeholder="Enter your name"
                    required
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium">
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 w-full rounded-lg border p-3"
                    placeholder="Enter your email"
                    required
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium">
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="mt-1 w-full rounded-lg border p-3"
                    placeholder="Create a password"
                    required
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium"
                >
                    Confirm Password
                </label>

                <input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border p-3"
                    placeholder="Confirm your password"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? 'Creating account...' : 'Register'}
            </button>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600">
                    Sign In
                </Link>
            </p>
        </form>
    );
}