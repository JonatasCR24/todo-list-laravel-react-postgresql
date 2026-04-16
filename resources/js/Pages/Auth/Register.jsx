import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Cadastro" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Crie sua conta
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Comece a organizar seu dia e focar no que importa.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nome Completo" className="dark:text-gray-300" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="E-mail" className="dark:text-gray-300" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Senha" className="dark:text-gray-300" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Senha"
                        className="dark:text-gray-300"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        className="w-full justify-center bg-pomoblue-600 hover:bg-pomoblue-700 py-3 text-base rounded-xl transition-transform active:scale-95 shadow-md"
                        disabled={processing}
                    >
                        Cadastrar
                    </PrimaryButton>
                </div>

                <div className="text-center mt-6">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Já tem uma conta? </span>
                    <Link
                        href={route('login')}
                        className="text-sm font-bold text-pomoblue-600 hover:text-pomoblue-700 dark:text-pomoblue-400 underline transition-colors"
                    >
                        Faça login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}