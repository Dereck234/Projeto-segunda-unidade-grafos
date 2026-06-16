import { useState } from 'react';
import { cadastrarUsuario } from '../services/api';
import type { Usuario } from '../types';

interface Props {
  onCadastro: (u: Usuario) => void;
}

export default function CadastroUsuario({ onCadastro }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleSubmit() {
    if (!nome.trim() || !email.trim()) {
      setMsg('Preencha nome e email.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      const u = await cadastrarUsuario({ nome, email });
      onCadastro(u);
      setNome('');
      setEmail('');
      setMsg(`✅ Usuário "${u.nome}" cadastrado com sucesso!`);
    } catch {
      setMsg('❌ Erro ao cadastrar. O Spring Boot está rodando?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>👤 Cadastrar Usuário</h2>
      <div className="form-group">
        <input
          className="input"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </div>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}
