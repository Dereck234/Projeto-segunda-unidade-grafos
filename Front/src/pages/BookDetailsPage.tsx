import { useParams } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const bookDetails = {
  title: 'A Jornada do Desenvolvedor',
  author: 'Larissa Silva',
  rating: 4.9,
  reviews: 1280,
  description:
    'Um guia completo para desenvolver software moderno, com foco em design de produto, UX e boas práticas de engenharia.',
  category: 'Tecnologia',
  published: '2025',
};

export default function BookDetailsPage() {
  const { id } = useParams();

  return (
      <section className="space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Detalhes do livro</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-50">{bookDetails.title}</h1>
              <p className="mt-2 text-sm text-slate-400">ID do livro: {id ?? 'desconhecido'}</p>
              <p className="mt-3 text-slate-400">Um livro essencial para times que constroem produtos digitais escaláveis.</p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
              <Star className="h-4 w-4 text-amber-400" /> {bookDetails.rating} ({bookDetails.reviews} avaliações)
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-soft">
            <div className="grid gap-5">
              <div className="rounded-[2rem] bg-gradient-to-br from-primary to-primarySoft p-10 text-slate-950">
                <p className="text-sm uppercase tracking-[0.24em]">Capa</p>
                <p className="mt-4 text-2xl font-semibold">{bookDetails.title}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400">Autor</p>
                  <p className="text-lg font-semibold text-slate-100">{bookDetails.author}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Categoria</p>
                  <p className="text-lg font-semibold text-slate-100">{bookDetails.category}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Publicado</p>
                  <p className="text-lg font-semibold text-slate-100">{bookDetails.published}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-slate-950/80 p-3 text-primary">
                <ArrowRight className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Resumo</p>
                <p className="mt-2 text-slate-400">Detalhes essenciais para acelerar sua leitura.</p>
              </div>
            </div>
            <p className="mt-6 text-slate-300 leading-7">{bookDetails.description}</p>
            <button className="mt-8 inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-primary to-primarySoft px-6 py-3 text-sm font-semibold text-white transition hover:shadow-soft">
              Ver mais detalhes
            </button>
          </article>
        </div>
      </section>
  );
}
