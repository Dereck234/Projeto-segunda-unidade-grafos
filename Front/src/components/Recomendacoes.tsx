import { useState } from 'react';
import { getRecomendacoes, getLivrosCurtidos, curtirLivro } from '../services/api';
import type { Livro, Usuario } from '../types';

interface Props {
  usuarios: Usuario[];
  livros: Livro[];
  usuarioInicial?: string;
}

export default function Recomendacoes({ usuarios, livros, usuarioInicial }: Props) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(usuarioInicial ?? '');
  const [livroSelecionado, setLivroSelecionado] = useState('');
  const [recomendacoes, setRecomendacoes] = useState<Livro[]>([]);
  const [curtidos, setCurtidos] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function buscarRecomendacoes() {
    if (!usuarioSelecionado) return;
    setLoading(true);
    setMsg('');
    try {
      const uid = Number(usuarioSelecionado);
      const [recs, curts] = await Promise.all([
        getRecomendacoes(uid),
        getLivrosCurtidos(uid),
      ]);
      setRecomendacoes(recs);
      setCurtidos(curts);
      if (recs.length === 0) {
        setMsg('Nenhuma recomendação ainda. Curta mais livros!');
      }
    } catch {
      setMsg('❌ Erro ao buscar recomendações.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCurtir() {
    if (!usuarioSelecionado || !livroSelecionado) {
      setMsg('Selecione um usuário e um livro.');
      return;
    }
    try {
      await curtirLivro(Number(usuarioSelecionado), Number(livroSelecionado));
      setMsg('✅ Curtida registrada!');
      await buscarRecomendacoes();
    } catch {
      setMsg('❌ Erro ao curtir livro.');
    }
  }

  return (
    <div className="card">
      <h2>🤝 Filtragem Colaborativa</h2>
      <p className="subtitle">
        "Usuários com gostos parecidos com os seus também curtiram..."
      </p>

      <div className="form-group">
        <select
          className="input"
          value={usuarioSelecionado}
          onChange={e => setUsuarioSelecionado(e.target.value)}
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>
              {u.nome} ({u.email})
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={buscarRecomendacoes} disabled={loading}>
          {loading ? 'Buscando...' : 'Ver Recomendações'}
        </button>
      </div>

      {curtidos.length > 0 && (
        <div className="secao">
          <h3>📚 Livros já curtidos</h3>
          <div className="tags">
            {curtidos.map(l => (
              <span key={l.id} className="tag tag-curtido">{l.titulo}</span>
            ))}
          </div>
        </div>
      )}

      {recomendacoes.length > 0 && (
        <div className="secao">
          <h3>✨ Recomendados para você</h3>
          <div className="livros-grid">
            {recomendacoes.map(l => (
              <div key={l.id} className="livro-card recomendado">
                <div className="livro-titulo">{l.titulo}</div>
                <div className="livro-autor">{l.autor}</div>
                <span className="tag tag-genero">{l.genero}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="secao">
        <h3>❤️ Curtir um livro</h3>
        <div className="form-group">
          <select
            className="input"
            value={livroSelecionado}
            onChange={e => setLivroSelecionado(e.target.value)}
          >
            <option value="">Selecione um livro</option>
            {livros.map(l => (
              <option key={l.id} value={l.id}>{l.titulo}</option>
            ))}
          </select>
          <button className="btn btn-accent" onClick={handleCurtir}>
            Curtir
          </button>
        </div>
      </div>

      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}
