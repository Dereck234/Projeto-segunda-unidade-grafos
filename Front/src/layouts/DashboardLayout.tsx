import { Link, Outlet } from 'react-router-dom';
import { Bell, BookOpen, Home, LogOut, Search, Star, User } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const navItems = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Favoritos', href: '/favorites', icon: Star },
  { label: 'Perfil', href: '/profile', icon: User },
];

export default function DashboardLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 lg:px-10">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <Link to="/home" className="inline-flex items-center gap-3 text-lg font-semibold text-slate-50">
              <BookOpen className="h-8 w-8 text-primary" />
              Books SaaS
            </Link>

            <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  placeholder="Buscar livros, autores ou categorias"
                  className="w-full rounded-full border border-white/10 bg-slate-950/80 py-3 pl-12 pr-4 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950/80 text-slate-100 transition hover:bg-slate-900">
                  <Bell className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition hover:border-primary"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_3fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-soft backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <img src={user?.avatarUrl} alt={user?.fullName ?? 'Avatar'} className="h-16 w-16 rounded-3xl object-cover" />
              <div>
                <p className="text-sm text-slate-400">Bem-vindo</p>
                <p className="text-lg font-semibold text-slate-50">{user?.fullName}</p>
                <p className="text-sm text-slate-500">@{user?.username}</p>
              </div>
            </div>

            <nav className="mt-10 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-sm text-slate-200 transition hover:border-primary"
                >
                  <item.icon className="h-5 w-5 text-slate-300 group-hover:text-primary" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="space-y-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
