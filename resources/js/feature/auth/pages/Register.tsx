import { Head } from '@inertiajs/react';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
    return (
        <>
            <Head title="Register - Blog CMS" />

            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Register to start managing your blog
                        </p>
                    </div>

                    <RegisterForm />
                </div>
            </main>
        </>
    );
}