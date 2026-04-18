<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verifique seu e-mail - PomoTDL 🚀')
                ->greeting('Olá, ' . $notifiable->name . '!')
                ->line('Bem-vindo(a) ao PomoTDL! Estamos muito felizes em ter você a bordo.')
                ->line('Para começar a organizar suas tarefas e dominar o seu foco, precisamos apenas confirmar que este endereço de e-mail é realmente seu.')
                ->action('Verificar E-mail', $url)
                ->line('Se você não criou uma conta no PomoTDL, basta ignorar este e-mail.')
                ->salutation('Foque em realizar, Equipe PomoTDL.');
        });

        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            $url = url(route('password.reset', [
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false));

            return (new MailMessage)
                ->subject('Recuperação de Senha - PomoTDL 🔐')
                ->greeting('Olá!')
                ->line('Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha para a sua conta.')
                ->action('Redefinir Senha', $url)
                ->line('Este link de redefinição de senha expirará em 60 minutos.')
                ->line('Se você não solicitou uma redefinição de senha, nenhuma ação adicional é necessária.')
                ->salutation('Foque em realizar, Equipe PomoTDL.');
        });
    }
}