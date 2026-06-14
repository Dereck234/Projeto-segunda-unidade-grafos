import { Settings, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Perfil</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-50">Sua conta</h1>
            <p className="mt-2 text-slate-400">Gerencie suas preferências e dados de leitura.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primarySoft">
            <Settings className="h-4 w-4" /> Editar perfil
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm text-slate-400">Nome completo</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">{user?.fullName}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm text-slate-400">E-mail</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">{user?.email}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm text-slate-400">Usuário</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">@{user?.username}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm text-slate-400">Segurança</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">Proteção ativa</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-slate-400">Configurações</p>
                <p className="mt-2 text-slate-100">Autenticação e preferências</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-slate-400">Planos</p>
                <p className="mt-2 text-slate-100">Recursos SaaS para leitura avançada</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
