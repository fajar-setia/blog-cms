import { useForm, Link } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function LoginForm() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/login');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
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
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                    </p>
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
                    placeholder="Enter your password"
                    required
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) =>
                            setData('remember', e.target.checked)
                        }
                    />
                    Remember me
                </label>
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link href="/register" className="font-medium text-blue-600">
                    Register
                </Link>
            </p>
        </form>
    );
}