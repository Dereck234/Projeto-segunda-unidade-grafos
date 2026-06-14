import { useState, type ChangeEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../context/useAuth';
import FormInput from '../components/ui/FormInput';

const registerSchema = z
  .object({
    fullName: z.string().min(3, 'Informe seu nome completo'),
    username: z.string().min(3, 'Informe um nome de usuário'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'Confirme sua senha'),
    avatar: z.any().optional(),
    acceptTerms: z.boolean().refine((value) => value, {
      message: 'Você deve aceitar os Termos de Uso',
    }),
    acceptPrivacy: z.boolean().refine((value) => value, {
      message: 'Você deve aceitar a Política de Privacidade',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined,
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      await signUp({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        avatar: data.avatar?.[0] ?? null,
        acceptTerms: data.acceptTerms,
        acceptPrivacy: data.acceptPrivacy,
      });
      navigate('/home', { replace: true });
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Falha ao criar conta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-8 lg:px-10">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Crie sua conta</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-50">Cadastro premium para leitores.</h1>
            </div>
            <Link
              to="/login"
              className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-primary"
            >
              Já tenho conta
            </Link>
          </div>

          <form className="mt-10 grid gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span className="font-medium text-slate-100">Nome completo</span>
                <FormInput type="text" placeholder="Maria da Silva" {...register('fullName')} />
                {errors.fullName && <p className="text-sm text-rose-400">{errors.fullName.message}</p>}
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                <span className="font-medium text-slate-100">Nome de usuário</span>
                <FormInput type="text" placeholder="mariadasilva" {...register('username')} />
                {errors.username && <p className="text-sm text-rose-400">{errors.username.message}</p>}
              </label>
            </div>

            <label className="space-y-2 text-sm text-slate-200">
              <span className="font-medium text-slate-100">E-mail</span>
              <FormInput type="email" placeholder="seu@email.com" {...register('email')} />
              {errors.email && <p className="text-sm text-rose-400">{errors.email.message}</p>}
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span className="font-medium text-slate-100">Senha</span>
                <FormInput type="password" placeholder="Senha forte" {...register('password')} />
                {errors.password && <p className="text-sm text-rose-400">{errors.password.message}</p>}
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span className="font-medium text-slate-100">Confirmar senha</span>
                <FormInput type="password" placeholder="Repita a senha" {...register('confirmPassword')} />
                {errors.confirmPassword && <p className="text-sm text-rose-400">{errors.confirmPassword.message}</p>}
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
              <label className="group flex cursor-pointer items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/90 p-4 transition hover:border-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-primary transition group-hover:bg-primary/10">
                  <Camera size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">Foto de perfil</p>
                  <p className="text-sm text-slate-400">Faça upload opcional para personalizar sua conta.</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register('avatar')}
                  onChange={handleAvatarChange}
                />
              </label>
              {avatarPreview && (
                <img src={avatarPreview} alt="Prévia do avatar" className="h-24 w-24 rounded-3xl object-cover" />
              )}
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-slate-900 text-primary focus:ring-primary" {...register('acceptTerms')} />
                Aceito os Termos de Uso
              </label>
              {errors.acceptTerms && <p className="text-sm text-rose-400">{errors.acceptTerms.message}</p>}
              <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-slate-900 text-primary focus:ring-primary" {...register('acceptPrivacy')} />
                Aceito a Política de Privacidade
              </label>
              {errors.acceptPrivacy && <p className="text-sm text-rose-400">{errors.acceptPrivacy.message}</p>}
            </div>

            {statusMessage && <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">{statusMessage}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-3xl bg-gradient-to-r from-primary to-primarySoft px-6 py-4 text-base font-semibold text-white transition hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
            </button>

            <p className="text-center text-sm text-slate-500">
              Já possui conta?{' '}
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
