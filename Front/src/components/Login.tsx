import { useState, FormEvent } from 'react';
import type { Usuario } from '../types';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, GoogleIcon, GitHubIcon } from './icons';

interface Props {
  usuarios: Usuario[];
  onEntrar: (usuario: Usuario | null) => void;
  onCriarConta: () => void;
}

const EMAIL_LEMBRADO_KEY = 'bookgraph:email-lembrado';

export default function Login({ usuarios, onEntrar, onCriarConta }: Props) {
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_LEMBRADO_KEY) ?? '');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(() => Boolean(localStorage.getItem(EMAIL_LEMBRADO_KEY)));
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  function handleEsqueciSenha() {
    setMsg('Recuperação de senha ainda não está disponível nesta versão de demonstração.');
  }

  function handleSocial(provedor: string) {
    setMsg(`Login com ${provedor} ainda não está disponível nesta versão de demonstração.`);
  }

  async function handleSubmit(e?: FormEvent) {
    // Evita o recarregamento clássico da página ao submeter o formulário
    if (e) e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setMsg('Preencha e-mail e senha para continuar.');
      return;
    }
    setLoading(true);
    setMsg('');

    // Demonstração: não há autenticação real no backend ainda.
    await new Promise(r => setTimeout(r, 350));
    const encontrado = usuarios.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (lembrar) localStorage.setItem(EMAIL_LEMBRADO_KEY, email.trim());
    else localStorage.removeItem(EMAIL_LEMBRADO_KEY);

    setLoading(false);
    onEntrar(encontrado ?? null);
  }

  return (
    <div className="login-screen">
      <div className="login-grid">
        {/* Painel de marca */}
        <div className="login-panel">
          <span className="eyebrow" role="img" aria-label="Livros">📚 Sistema de Recomendação por Grafos</span>
          <h1 className="login-title">
            Descubra seu próximo <span className="accent-word">livro favorito</span>.
          </h1>
          <p className="login-desc">
            Entre para ver recomendações baseadas na similaridade de gostos entre
            leitores e explore a rede de conexões entre livros, tudo modelado em
            um grafo no Neo4j.
          </p>
          <div className="login-feature-grid">
            <div className="login-feature">
              <span className="feature-tag">Confiabilidade</span>
              <span className="feature-value">Dados como grafo</span>
            </div>
            <div className="login-feature">
              <span className="feature-tag">Desempenho</span>
              <span className="feature-value">Busca instantânea</span>
            </div>
          </div>
        </div>

        {/* Card de login */}
        <div className="login-card">
          <div className="login-card-head">
            <div>
              <span className="eyebrow">Bem-vindo de volta</span>
              <div className="login-card-title">Entrar na conta</div>
            </div>
            <span className="badge-soft">Demonstração</span>
          </div>

          {/* Mudança estrutural: Agora usamos a tag <form> com onSubmit */}
          <form className="form-group" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-field" className="field-label" style={{ position: 'relative', top: '-10px' }}>
                <MailIcon size={14} aria-hidden="true" /> E-mail
              </label>
              <div className="input-wrap">
                <input
                  id="email-field"
                  className="input"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password-field" className="field-label" style={{ position: 'relative', top: '-10px' }}>
                <LockIcon size={14} aria-hidden="true" /> Senha
              </label>
              <div className="input-wrap">
                <input
                  id="password-field"
                  className="input"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-toggle"
                  onClick={() => setMostrarSenha(s => !s)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="checkbox-row">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={lembrar} 
                  onChange={e => setLembrar(e.target.checked)} 
                />
                Lembrar-me
              </label>
              <button type="button" className="link" onClick={handleEsqueciSenha}>
                Esqueci minha senha
              </button>
            </div>

            {/* O botão agora é type="submit" para disparar o form automaticamente */}
            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar agora'}
            </button>
          </form>

          <div className="login-divider">ou continue com</div>
          <div className="login-social-grid">
            <button type="button" className="btn btn-ghost" onClick={() => handleSocial('Google')}>
              <GoogleIcon /> Google
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => handleSocial('GitHub')}>
              <GitHubIcon /> GitHub
            </button>
          </div>

          {msg && <p className="msg">{msg}</p>}

          <p className="login-footer-text">
            Não tem conta?{' '}
            <button type="button" className="link" onClick={onCriarConta}>
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}