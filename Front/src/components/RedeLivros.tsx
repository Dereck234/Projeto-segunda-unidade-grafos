import { useState } from 'react';
import { getRedeLivros, getLivros } from '../services/api';
import type { Livro } from '../types';

interface Props {
  livros: Livro[];
}

export default function RedeLivros({ livros }: Props) {
  const [tituloInicial, setTituloInicial] = useState('');
  const [profundidade, setProfundidade] = useState(2);
  const [rede, setRede] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [buscou, setBuscou] = useState(false);

  async function explorar() {
    if (!tituloInicial) {
      setMsg('Selecione um livro inicial.');
      return;
    }
    setLoading(true);
    setMsg('');
    setBuscou(false);
    try {
      const resultado = await getRedeLivros(tituloInicial, profundidade);
      setRede(resultado);
      setBuscou(true);
      if (resultado.length === 0) {
        setMsg('Nenhum livro conectado encontrado nessa profundidade.');
      }
    } catch {
      setMsg('❌ Erro ao explorar a rede.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>🕸️ Rede de Livros (BFS)</h2>
      <p className="subtitle">
        Busca em Largura: explora a rede de conexões entre livros nível por nível.
      </p>

      <div className="form-group">
        <select
          className="input"
          value={tituloInicial}
          onChange={e => setTituloInicial(e.target.value)}
        >
          <option value="">Selecione o livro inicial</option>
          {livros.map(l => (
            <option key={l.id} value={l.titulo}>{l.titulo}</option>
          ))}
        </select>

        <div className="range-group">
          <label>Profundidade: <strong>{profundidade}</strong></label>
          <input
            type="range"
            min={1}
            max={4}
            value={profundidade}
            onChange={e => setProfundidade(Number(e.target.value))}
          />
        </div>

        <button className="btn btn-primary" onClick={explorar} disabled={loading}>
          {loading ? 'Explorando...' : 'Explorar Rede'}
        </button>
      </div>

      {buscou && (
        <div className="secao">
          <div className="grafo-visual">
            {/* Livro central */}
            <div className="no-central">
              <div className="no-livro no-origem">📖 {tituloInicial}</div>
            </div>

            {/* Livros conectados via BFS */}
            {rede.length > 0 && (
              <>
                <div className="seta">↓ conexões encontradas pelo BFS</div>
                <div className="nos-conectados">
                  {rede.map(l => (
                    <div key={l.id} className="no-livro no-conexao">
                      <div className="livro-titulo">{l.titulo}</div>
                      <div className="livro-autor">{l.autor}</div>
                      <span className="tag tag-genero">{l.genero}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}
