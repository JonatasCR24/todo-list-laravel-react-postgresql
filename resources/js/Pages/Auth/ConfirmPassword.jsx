import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmar Senha" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    Acesso Restrito
                </h2>
            </div>

            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                Esta é uma área segura do aplicativo. Por favor, confirme sua senha antes de continuar para provar que é você mesmo.
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="password" value="Sua Senha Atual" className="dark:text-gray-300" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        className="w-full justify-center bg-pomoblue-600 hover:bg-pomoblue-700 py-3 text-base rounded-xl transition-transform active:scale-95 shadow-md"
                        disabled={processing}
                    >
                        Confirmar Identidade
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}