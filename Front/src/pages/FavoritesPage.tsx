import { Heart } from 'lucide-react';

const favorites = [
  { id: '1', title: 'Design de Interação', author: 'Camila Rocha', rating: 4.9 },
  { id: '2', title: 'Produtos Digitais', author: 'Felipe Araújo', rating: 4.8 },
  { id: '3', title: 'Estratégia de Conteúdo', author: 'Natália Alves', rating: 4.7 },
];

export default function FavoritesPage() {
  return (
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Favoritos</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-50">Livros guardados</h1>
          <p className="mt-2 text-slate-400">Uma coleção rápida dos livros que você marcou.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((book) => (
            <article key={book.id} className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 transition hover:border-primary">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-50">{book.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{book.author}</p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">{book.rating}</div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Heart className="h-4 w-4 text-rose-400" />
                Marcado como favorito
              </div>
            </article>
          ))}
        </div>
      </section>
  );
}
