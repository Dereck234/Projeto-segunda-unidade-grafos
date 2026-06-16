import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { listarLivros, livrosPopulares, listarUsuarios, recomendacoesPara } from '../services/api';
import type { Livro } from '../types';

export default function HomePage() {
  const { user } = useAuth();

  const [recomendados, setRecomendados] = useState<Livro[]>([]);
  const [populares, setPopulares] = useState<Livro[]>([]);
  const [todos, setTodos] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // useEffect com [] roda UMA vez, quando a página abre. É aqui que buscamos os dados do backend.
  useEffect(() => {
    async function carregar() {
      try {
        // O essencial: lista de livros + lista de usuários. Se isso falhar, o backend está fora.
        const [listaTodos, usuarios] = await Promise.all([listarLivros(), listarUsuarios()]);
        setTodos(listaTodos);

        // Mais populares (endpoint novo do backend). Tolera falha caso ainda não tenha sido adicionado.
        try {
          setPopulares(await livrosPopulares());
        } catch {
          setPopulares([]);
        }

        // Recomendações: usamos o primeiro usuário do banco como exemplo de "usuário logado".
        if (usuarios.length > 0) {
          try {
            setRecomendados(await recomendacoesPara(usuarios[0].id));
          } catch {
            setRecomendados([]);
          }
        }
      } catch (e) {
        setErro(e instanceof Error ? e.message : 'Erro ao carregar dados do servidor.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) {
    return <p className="text-slate-300">Carregando dados do servidor...</p>;
  }

  if (erro) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-950/40 p-6 text-red-200">
        <p className="font-semibold">Não consegui falar com o backend.</p>
        <p className="mt-2 text-sm">{erro}</p>
        <p className="mt-2 text-sm text-red-300/80">
          Confirme que o backend (terminal "java Back") está rodando na porta 8080.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Olá, {user?.fullName?.split(' ')[0] ?? 'leitor'}
        </span>
        <h1 className="mt-4 text-3xl font-semibold text-slate-50 sm:text-4xl">Continue sua jornada literária</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Recomendações geradas pelo grafo de gostos, vindas direto do backend.
        </p>
      </header>

      {/* RECOMENDADOS — filtragem colaborativa (grafo de usuários que curtem livros em comum) */}
      {recomendados.length > 0 && (
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Recomendados</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-50">Leituras personalizadas</h2>
            </div>
            <span className="rounded-3xl bg-slate-950/90 px-4 py-2 text-sm text-slate-300">Filtragem colaborativa</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {recomendados.map((livro) => (
              <BookCard key={livro.id} livro={livro} />
            ))}
          </div>
        </section>
      )}

      {/* MAIS POPULARES — centralidade de grau (livros com mais arestas :CURTIU chegando) */}
      {populares.length > 0 && (
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Mais populares</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-50">Títulos em alta</h2>
            </div>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div className="mt-8 grid gap-4">
            {populares.map((livro) => (
              <BookCard key={livro.id} livro={livro} />
            ))}
          </div>
        </section>
      )}

      {/* ACERVO — todos os livros do banco */}
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Acervo</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-50">Todos os livros</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {todos.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BookCard({ livro }: { livro: Livro }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
      <div className="flex items-center gap-4">
        <div className="h-16 w-12 rounded-3xl bg-gradient-to-br from-primary to-primarySoft" />
        <div className="flex-1">
          <p className="text-lg font-semibold text-slate-50">{livro.titulo}</p>
          <p className="text-sm text-slate-400">{livro.autor}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-slate-400">{livro.genero} · {livro.anoPublicacao}</p>
        <Link
          to={`/books/${livro.id}`}
          className="inline-flex items-center justify-center rounded-3xl bg-primary px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-primarySoft"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}