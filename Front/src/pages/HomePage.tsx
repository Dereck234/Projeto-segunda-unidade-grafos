import { Bell, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const books = [
  { id: '1', title: 'A Jornada do Desenvolvedor', author: 'Larissa Silva', rating: 4.9, reviews: 1280, category: 'Tecnologia' },
  { id: '2', title: 'UX para Produtos SaaS', author: 'Diego Martins', rating: 4.8, reviews: 930, category: 'Design' },
  { id: '3', title: 'Marketing de Conteúdo', author: 'Marta Lopes', rating: 4.7, reviews: 760, category: 'Marketing' },
  { id: '4', title: 'Leitura Ágil', author: 'Rafael Costa', rating: 4.6, reviews: 540, category: 'Produtividade' },
];

const categories = ['Ficção', 'Negócios', 'Tecnologia', 'Design', 'Autoajuda', 'Biografias'];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Olá, {user?.fullName.split(' ')[0]}
              </span>
              <h1 className="mt-4 text-3xl font-semibold text-slate-50 sm:text-4xl">Continue sua jornada literária</h1>
              <p className="mt-3 max-w-2xl text-slate-400">Descubra novos lançamentos, favoritos e livros recomendados pelo seu perfil.</p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100">
              <Bell size={18} />
              <span className="text-sm">7 notificações</span>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Recomendados</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-50">Leituras personalizadas</h2>
              </div>
              <span className="rounded-3xl bg-slate-950/90 px-4 py-2 text-sm text-slate-300">Baseado no seu histórico</span>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {books.slice(0, 2).map((book) => (
                <div key={book.id} className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-12 rounded-3xl bg-gradient-to-br from-primary to-primarySoft" />
                    <div>
                      <p className="text-lg font-semibold text-slate-50">{book.title}</p>
                      <p className="text-sm text-slate-400">{book.author}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">{book.category}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-sm text-slate-300">
                      <Star size={14} className="text-amber-400" /> {book.rating} ({book.reviews})
                    </div>
                  </div>
                  <Link
                    to={`/books/${book.id}`}
                    className="mt-6 inline-flex items-center justify-center rounded-3xl bg-primary px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-primarySoft"
                  >
                    Ver detalhes
                  </Link>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Continuar lendo</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50">No meio da leitura</h2>
            <p className="mt-3 text-slate-400">Retome onde parou em títulos com progresso recente.</p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-slate-50">A Jornada do Desenvolvedor</p>
                    <p className="text-sm text-slate-400">Capítulo 5 de 18</p>
                  </div>
                  <span className="rounded-full bg-slate-800/90 px-3 py-1 text-sm text-slate-300">45%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-primarySoft" />
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Mais populares</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-50">Títulos em alta</h2>
              </div>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="mt-8 grid gap-4">
              {books.slice(0, 3).map((book) => (
                <div key={book.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-12 rounded-3xl bg-gradient-to-br from-primary to-primarySoft" />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-50">{book.title}</p>
                      <p className="text-sm text-slate-400">{book.author}</p>
                    </div>
                    <span className="text-sm text-slate-300">{book.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Categorias</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50">Explorar gêneros</h2>
            <div className="mt-8 grid gap-3">
              {categories.map((category) => (
                <span key={category} className="inline-flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
                  {category}
                  <span className="rounded-full bg-slate-800/90 px-3 py-1 text-xs text-slate-400">Ver</span>
                </span>
              ))}
            </div>
          </article>
        </section>
      </div>
  );
}
