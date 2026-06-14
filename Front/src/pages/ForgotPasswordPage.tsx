import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../context/useAuth';
import FormInput from '../components/ui/FormInput';

const forgotSchema = z.object({ email: z.string().email('E-mail inválido') });

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: ForgotFormData) {
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const response = await requestPasswordReset({ email: data.email });
      setStatusMessage(response?.message ?? 'Verifique seu e-mail para o link de recuperação.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Falha ao enviar o link.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-10">
        <section className="w-full rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-soft backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-4">
            <ShieldCheck className="h-11 w-11 rounded-3xl bg-primary/10 p-3 text-primary" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Recuperação</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-50">Recupere sua senha</h1>
            </div>
          </div>
          <p className="text-slate-400">Informe o e-mail cadastrado para receber o link de redefinição.</p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="space-y-2 text-sm text-slate-200">
              <span className="block font-medium text-slate-100">E-mail</span>
              <FormInput type="email" placeholder="seu@email.com" {...register('email')} />
              {errors.email && <p className="text-sm text-rose-400">{errors.email.message}</p>}
            </label>

            {statusMessage && <p className="rounded-3xl border border-slate-600/40 bg-slate-950/80 p-4 text-sm text-slate-100">{statusMessage}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-3xl bg-gradient-to-r from-primary to-primarySoft px-6 py-4 text-base font-semibold text-white transition hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar link de recuperação'}
            </button>

            <p className="text-center text-sm text-slate-500">
              Lembrou a senha?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-primarySoft">
                Faça login
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
