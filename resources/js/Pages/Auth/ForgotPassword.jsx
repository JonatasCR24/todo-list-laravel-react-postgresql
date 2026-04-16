import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar Senha" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Recuperação de Conta
                </h2>
            </div>

            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                Esqueceu sua senha? Sem problemas. Basta nos informar seu e-mail e enviaremos um link de recuperação para você criar uma nova.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400 text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="E-mail cadastrado" className="dark:text-gray-300" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton 
                        className="w-full justify-center bg-pomoblue-600 hover:bg-pomoblue-700 py-3 text-base rounded-xl transition-transform active:scale-95 shadow-md" 
                        disabled={processing}
                    >
                        Enviar Link de Recuperação
                    </PrimaryButton>
                </div>

                <div className="text-center mt-6">
                    <Link
                        href={route('login')}
                        className="text-sm font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline transition-colors"
                    >
                        Voltar para o Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}