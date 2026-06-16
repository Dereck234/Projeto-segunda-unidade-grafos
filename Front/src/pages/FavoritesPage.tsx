import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { listarUsuarios, curtidosDe } from '../services/api';
import type { Livro } from '../types';

export default function FavoritesPage() {
  const [favoritos, setFavoritos] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        // Usamos o primeiro usuário do banco como exemplo de "usuário logado".
        const usuarios = await listarUsuarios();
        if (usuarios.length > 0) {
          setFavoritos(await curtidosDe(usuarios[0].id));
        }
      } catch (e) {
        setErro(e instanceof Error ? e.message : 'Erro ao carregar favoritos.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Favoritos</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-50">Livros guardados</h1>
        <p className="mt-2 text-slate-400">Os livros que o usuário curtiu (relação :CURTIU no grafo).</p>
      </div>

      {carregando && <p className="text-slate-300">Carregando favoritos...</p>}

      {erro && (
        <div className="rounded-3xl border border-red-500/30 bg-red-950/40 p-6 text-red-200">
          <p className="font-semibold">Não consegui falar com o backend.</p>
          <p className="mt-2 text-sm">{erro}</p>
        </div>
      )}

      {!carregando && !erro && favoritos.length === 0 && (
        <p className="text-slate-400">Este usuário ainda não curtiu nenhum livro.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {favoritos.map((livro) => (
          <article
            key={livro.id}
            className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 transition hover:border-primary"
          >
            <div>
              <p className="text-lg font-semibold text-slate-50">{livro.titulo}</p>
              <p className="mt-2 text-sm text-slate-400">{livro.autor}</p>
              <p className="mt-1 text-sm text-slate-500">{livro.genero} · {livro.anoPublicacao}</p>
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