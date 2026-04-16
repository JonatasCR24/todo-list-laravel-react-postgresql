import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Redefinir Senha" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Crie uma nova senha
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Quase lá! Escolha uma nova senha forte e segura.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="E-mail" className="dark:text-gray-300" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-transparent cursor-not-allowed"
                        autoComplete="username"
                        readOnly
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Nova Senha" className="dark:text-gray-300" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Nova Senha"
                        className="dark:text-gray-300"
                    />
                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        className="w-full justify-center bg-pomoblue-600 hover:bg-pomoblue-700 py-3 text-base rounded-xl transition-transform active:scale-95 shadow-md"
                        disabled={processing}
                    >
                        Salvar Nova Senha
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}