import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white w-full border-t border-gray-100 dark:bg-gray-900 dark:border-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8 flex flex-col items-center justify-center text-center">

                {/* LOGO REDUZIDA NO FOOTER */}
                <Link href="/" className="mb-6 group">
                    <img
                        src="/images/logo.png"
                        alt="PomoTDL"
                        className="h-14 w-auto transition-opacity group-hover:opacity-80"
                    />
                </Link>

                {/* SLOGAN CURTO */}
                <p className="text-lg font-bold text-gray-900 dark:text-gray-300 tracking-tight">
                    Foque em realizar.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mb-8">
                    A ferramenta que une gestão de tarefas com a técnica de foco Pomodoro.
                </p>

                {/* LINKS MINIMALISTAS */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center mb-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <Link href="/pomodoro" className="hover:text-pomoblue-700">O Pomodoro</Link>
                    <Link href="/tarefas" className="hover:text-pomoblue-700">Lista de Tarefas</Link>
                    <Link href="#" className="hover:text-pomoblue-700">Ajuda</Link>
                    <Link href="#" className="hover:text-pomoblue-700">Termos de Uso</Link>
                    <Link href="#" className="hover:text-pomoblue-700">Privacidade</Link>
                </div>

                {/* COPYRIGHT E MARCA */}
                <div className="border-t border-gray-100 w-full pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 dark:text-gray-400 gap-3">
                    <p>&copy; {currentYear} PomoTDL Co. Todos os direitos reservados.</p>
                    <p className="font-semibold flex gap-1.5 items-center">
                        Um projeto de produtividade ®️ Jonatas.
                    </p>
                </div>

            </div>
        </footer>
    );
}