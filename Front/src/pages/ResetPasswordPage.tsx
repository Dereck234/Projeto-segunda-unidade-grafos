import { useState } from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/useAuth';
import FormInput from '../components/ui/FormInput';

const resetSchema = z
  .object({
    password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const { resetPassword, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  async function onSubmit(data: ResetFormData) {
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      await resetPassword({ token, password: data.password, confirmPassword: data.confirmPassword });
      setStatusMessage('Senha atualizada com sucesso! Agora faça login.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Falha ao redefinir senha.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-10">
        <section className="w-full rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-soft backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Redefinição de senha</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-50">Defina uma nova senha segura</h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="space-y-2 text-sm text-slate-200">
              <span className="font-medium text-slate-100">Nova senha</span>
              <FormInput type="password" placeholder="Senha forte" {...register('password')} />
              {errors.password && <p className="text-sm text-rose-400">{errors.password.message}</p>}
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span className="font-medium text-slate-100">Confirmar senha</span>
              <FormInput type="password" placeholder="Repita a senha" {...register('confirmPassword')} />
              {errors.confirmPassword && <p className="text-sm text-rose-400">{errors.confirmPassword.message}</p>}
            </label>

            {statusMessage && <p className="rounded-3xl border border-slate-600/40 bg-slate-950/80 p-4 text-sm text-slate-100">{statusMessage}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-3xl bg-gradient-to-r from-primary to-primarySoft px-6 py-4 text-base font-semibold text-white transition hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Atualizando...' : 'Redefinir senha'}
            </button>

            <p className="text-center text-sm text-slate-500">
              Lembrou sua senha?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-primarySoft">
                Entrar
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
