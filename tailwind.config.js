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


            colors: { //pomoblue
                pomoblue: {
                    DEFAULT: '#0b26ef', //pomoblue
                    500: '#1d3cf5',     //pouco mais claro
                    600: '#0b26ef',     //pomoblue
                    700: '#081cbd',     //pouco mais escuro
                },
            },
        },
    },

    plugins: [forms],
};
