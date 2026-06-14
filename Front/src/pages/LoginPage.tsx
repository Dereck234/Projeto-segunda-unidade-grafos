import { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Globe, Github, Lock, Mail } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../context/useAuth';
import FormInput from '../components/ui/FormInput';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
  remember: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { signIn, signInWithProvider, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  });

  const from = location.state?.from?.pathname || '/home';

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  async function onSubmit(data: LoginFormData) {
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      await signIn(data);
      navigate(from, { replace: true });
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Falha no login.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col-reverse gap-12 px-4 py-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl lg:p-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Plataforma Books SaaS
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl">
              Gerencie sua leitura com segurança e performance.
            </h1>
            <p className="mt-4 text-slate-300 sm:text-lg">
              Faça login para acessar recomendações, favoritos e continuar de onde parou. Experiência premium para leitores profissionais.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Confiabilidade</p>
                <p className="mt-2 text-lg font-semibold text-slate-100">Autenticação segura</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Desempenho</p>
                <p className="mt-2 text-lg font-semibold text-slate-100">Fluxo rápido e responsivo</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Bem-vindo de volta</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-50">Entrar na conta</h2>
            </div>
            <div className="hidden rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-400 sm:block">
              Segurança premium
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="space-y-2 text-sm text-slate-200">
              <span className="flex items-center gap-2 font-medium text-slate-100">
                <Mail size={18} /> E-mail
              </span>
              <FormInput type="email" placeholder="nome@empresa.com" {...register('email')} />
              {errors.email && <p className="text-sm text-rose-400">{errors.email.message}</p>}
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span className="flex items-center gap-2 font-medium text-slate-100">
                <Lock size={18} /> Senha
              </span>
              <div className="relative">
                <FormInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha forte"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/80 p-2 text-slate-300 transition hover:bg-slate-700"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-rose-400">{errors.password.message}</p>}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-primary focus:ring-primary"
                  {...register('remember')}
                />
                Lembrar-me
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:text-primarySoft">
                Esqueci minha senha
              </Link>
            </div>

            {statusMessage && <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">{statusMessage}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-3xl bg-gradient-to-r from-primary to-primarySoft px-6 py-4 text-base font-semibold text-white transition hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar agora'}
            </button>

            <div className="relative text-center text-sm text-slate-500">
              <span className="bg-slate-900 px-3">ou continue com</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 transition hover:border-primary"
                onClick={() => signInWithProvider('google')}
              >
                <Globe size={18} /> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 transition hover:border-primary"
                onClick={() => signInWithProvider('github')}
              >
                <Github size={18} /> GitHub
              </button>
            </div>

            <p className="text-center text-sm text-slate-500">
              Não tem conta?{' '}
              <Link to="/register" className="font-semibold text-primary hover:text-primarySoft">
                Criar conta
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
