import { useState } from 'react';
import { cadastrarLivro } from '../services/api';
import type { Livro } from '../types';

interface Props {
  onCadastro: (l: Livro) => void;
}

export default function CadastroLivro({ onCadastro }: Props) {
  const [form, setForm] = useState({
    titulo: '', autor: '', genero: '', descricao: '', anoPublicacao: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  function update(field: string, value: string | number) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.titulo || !form.autor || !form.genero) {
      setMsg('Preencha título, autor e gênero.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      const l = await cadastrarLivro(form);
      onCadastro(l);
      setForm({ titulo: '', autor: '', genero: '', descricao: '', anoPublicacao: new Date().getFullYear() });
      setMsg(`✅ Livro "${l.titulo}" cadastrado!`);
    } catch {
      setMsg('❌ Erro ao cadastrar. O Spring Boot está rodando?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>📖 Cadastrar Livro</h2>
      <div className="form-group">
        <input className="input" placeholder="Título" value={form.titulo} onChange={e => update('titulo', e.target.value)} />
        <input className="input" placeholder="Autor" value={form.autor} onChange={e => update('autor', e.target.value)} />
        <input className="input" placeholder="Gênero (ex: Fantasia)" value={form.genero} onChange={e => update('genero', e.target.value)} />
        <input className="input" placeholder="Descrição breve" value={form.descricao} onChange={e => update('descricao', e.target.value)} />
        <input className="input" type="number" placeholder="Ano de publicação" value={form.anoPublicacao} onChange={e => update('anoPublicacao', Number(e.target.value))} />
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </div>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}
