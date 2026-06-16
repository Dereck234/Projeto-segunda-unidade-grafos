import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { listarLivros, redeDeLivro } from '../services/api';
import type { Livro } from '../types';

export default function BookDetailsPage() {
  const { id } = useParams();

  const [livro, setLivro] = useState<Livro | null>(null);
  const [similares, setSimilares] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        // Busca a lista completa de livros (endpoint que já existia) e encontra
        // o livro pelo id que veio na URL (/books/:id). Assim não precisamos
        // de nenhum endpoint novo no backend.
        const livros = await listarLivros();
        const encontrado = livros.find((l) => String(l.id) === String(id)) ?? null;
        setLivro(encontrado);

        // Se achou, busca a rede de similares (BFS pela relação SIMILAR_A) pelo título.
        if (encontrado) {
          try {
            setSimilares(await redeDeLivro(encontrado.titulo));
          } catch {
            setSimilares([]);
          }
        }
      } catch (e) {
        setErro(e instanceof Error ? e.message : 'Erro ao carregar o livro.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  if (carregando) {
    return <p className="text-slate-300">Carregando livro...</p>;
  }

  if (erro || !livro) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-950/40 p-6 text-red-200">
        <p className="font-semibold">Não consegui carregar este livro.</p>
        <p className="mt-2 text-sm">{erro ?? 'Livro não encontrado.'}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Detalhes do livro</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-50">{livro.titulo}</h1>
        <p className="mt-2 text-sm text-slate-400">{livro.autor}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-soft">
          <div className="rounded-[2rem] bg-gradient-to-br from-primary to-primarySoft p-10 text-slate-950">
            <p className="text-sm uppercase tracking-[0.24em]">Capa</p>
            <p className="mt-4 text-2xl font-semibold">{livro.titulo}</p>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-slate-400">Gênero</p>
              <p className="text-lg font-semibold text-slate-100">{livro.genero}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Publicado</p>
              <p className="text-lg font-semibold text-slate-100">{livro.anoPublicacao}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Descrição</p>
              <p className="text-slate-300 leading-7">{livro.descricao}</p>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-slate-950/80 p-3 text-primary">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Livros similares</p>
              <p className="mt-2 text-slate-400">Encontrados percorrendo o grafo (BFS pela relação SIMILAR_A).</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {similares.length === 0 ? (
              <p className="text-slate-400">Nenhum livro similar encontrado.</p>
            ) : (
              similares.map((s, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="font-semibold text-slate-100">{s.titulo}</p>
                  <p className="text-sm text-slate-400">{s.autor}</p>
                </div>
              ))
            )}
          </div>
        </article>
      </div>
    </section>
  );
}