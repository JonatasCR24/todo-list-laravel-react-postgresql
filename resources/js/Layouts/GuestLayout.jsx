import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';

export default function GuestLayout({ children }) {
    return (
        // Removemos o flex do container principal para ele não tentar espremer tudo na mesma tela
        <div className="bg-gray-50">

            {/* 1. O SEGREDO ESTÁ AQUI: min-h-screen SÓ na parte do formulário.
                Isso faz o formulário ocupar 100% da tela sozinho e centraliza tudo perfeitamente. */}
            <main className="flex min-h-screen flex-col items-center justify-center p-6">

                <Link href="/">
                    <ApplicationLogo className="h-24 w-auto fill-current text-gray-500" />
                </Link>

                <div className="mt-8 w-full overflow-hidden bg-white px-8 py-10 shadow-xl sm:max-w-md sm:rounded-2xl border border-gray-100">
                    {children}
                </div>

            </main>

            {/* 2. Como a <main> de cima já ocupou a tela toda, este Footer fica escondido logo abaixo.
                O usuário SÓ vai ver se rolar a página para baixo! */}
            <div className="w-full">
                <Footer />
            </div>

        </div>
    );
}