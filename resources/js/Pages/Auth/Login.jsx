import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Entrar" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Bem-vindo de volta!
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Faça login para acessar seu Pomodoro e suas Tarefas.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="E-mail" className="dark:text-gray-300" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* ÁREA DO LEMBRAR-ME E ESQUECI A SENHA */}
                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="text-pomoblue-600 focus:ring-pomoblue-500"
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400 select-none">
                            Lembrar de mim
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-pomoblue-600 hover:text-pomoblue-700 dark:text-pomoblue-400 dark:hover:text-pomoblue-300 transition-colors"
                        >
                            Esqueceu a senha?
                        </Link>
                    )}
                </div>

                {/* BOTÃO */}
                <div className="mt-6">
                    <PrimaryButton 
                        className="w-full justify-center bg-pomoblue-600 hover:bg-pomoblue-700 py-3 text-base rounded-xl transition-transform active:scale-95 shadow-md" 
                        disabled={processing}
                    >
                        Entrar na Conta
                    </PrimaryButton>
                </div>

                {/* LINK PARA CADASTRO */}
                <div className="text-center mt-6">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Novo por aqui? </span>
                    <Link
                        href={route('register')}
                        className="text-sm font-bold text-pomoblue-600 hover:text-pomoblue-700 dark:text-pomoblue-400 underline transition-colors"
                    >
                        Crie sua conta grátis
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}