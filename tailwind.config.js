import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            // add color with a name of pomoblue #0b26ef
            // add color with a name of pomoblue #0b26ef
            colors: {
                pomoblue: {
                    DEFAULT: '#0b26ef', // O azul exato da sua logo
                    500: '#1d3cf5',     // Um pouco mais claro
                    600: '#0b26ef',     // O azul exato da sua logo (Base)
                    700: '#081cbd',     // Um pouco mais escuro (Perfeito pro Hover!)
                },
            },
        },
    },

    plugins: [forms],
};
