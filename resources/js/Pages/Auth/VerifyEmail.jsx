import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificação de E-mail" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Verifique seu e-mail
                </h2>
            </div>

            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                Obrigado por se cadastrar! Antes de começar, você poderia verificar seu endereço de e-mail clicando no link que acabamos de enviar? Se você não recebeu o e-mail, clique no botão abaixo para enviarmos outro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 text-sm font-medium text-green-600 dark:text-green-400 text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    Um novo link de verificação foi enviado para o endereço de e-mail fornecido durante o registro.
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col items-center gap-4">
                <PrimaryButton
                    className="w-full justify-center bg-pomoblue-600 hover:bg-pomoblue-700 py-3 text-base rounded-xl transition-transform active:scale-95 shadow-md"
                    disabled={processing}
                >
                    Reenviar E-mail de Verificação
                </PrimaryButton>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline transition-colors"
                >
                    Sair da Conta
                </Link>
            </form>
        </GuestLayout>
    );
}