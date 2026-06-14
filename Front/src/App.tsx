import { useState, useEffect } from 'react';
import { getLivros, getUsuarios } from './services/api';
import type { Livro, Usuario } from './types';
import CadastroUsuario from './components/CadastroUsuario';
import CadastroLivro from './components/CadastroLivro';
import Recomendacoes from './components/Recomendacoes';
import RedeLivros from './components/RedeLivros';
import './App.css';

type Aba = 'usuarios' | 'livros' | 'recomendacoes' | 'rede';

export default function App() {
  const [aba, setAba] = useState<Aba>('recomendacoes');
  const [livros, setLivros] = useState<Livro[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

useEffect(() => {
    // Busca de Livros com logs
    getLivros()
      .then(dados => {
        console.log("🔥 SUCESSO LIVROS:", dados);
        
        // Se o Spring Boot estiver paginando, você precisará fazer:
        // setLivros(dados.content || dados);
        setLivros(dados); 
      })
      .catch(erro => {
        console.error("🚨 ERRO AO BUSCAR LIVROS:", erro);
      });

    // Busca de Usuários com logs
    getUsuarios()
      .then(dados => {
        console.log("🔥 SUCESSO USUÁRIOS:", dados);
        setUsuarios(dados);
      })
      .catch(erro => {
        console.error("🚨 ERRO AO BUSCAR USUÁRIOS:", erro);
      });
  }, []);

  const tabs: { id: Aba; label: string; icon: string }[] = [
    { id: 'recomendacoes', label: 'Recomendações', icon: '✨' },
    { id: 'rede',          label: 'Rede de Livros', icon: '🕸️' },
    { id: 'usuarios',      label: 'Usuários',       icon: '👤' },
    { id: 'livros',        label: 'Livros',         icon: '📖' },
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <div>
              <h1>BookGraph</h1>
              <span className="logo-sub">Sistema de Recomendação de Livros</span>
            </div>
          </div>
          <div className="stack-badges">
            <span className="badge badge-neo4j">Neo4j</span>
            <span className="badge badge-spring">Spring Boot</span>
            <span className="badge badge-react">React</span>
          </div>
        </div>
      </header>

      {/* Navegação */}
      <nav className="tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`tab ${aba === t.id ? 'tab-active' : ''}`}
            onClick={() => setAba(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      {/* Conteúdo */}
      <main className="main">
        {aba === 'recomendacoes' && (
          <Recomendacoes usuarios={usuarios} livros={livros} />
        )}
        {aba === 'rede' && (
          <RedeLivros livros={livros} />
        )}
        {aba === 'usuarios' && (
          <CadastroUsuario
            onCadastro={u => setUsuarios(prev => [...prev, u])}
          />
        )}
        {aba === 'livros' && (
          <CadastroLivro
            onCadastro={l => setLivros(prev => [...prev, l])}
          />
        )}
      </main>

      {/* Info panel */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="stat">
            <span className="stat-num">{livros.length}</span>
            <span className="stat-label">livros no grafo</span>
          </div>
          <div className="stat">
            <span className="stat-num">{usuarios.length}</span>
            <span className="stat-label">usuários cadastrados</span>
          </div>
          <div className="stat algo">
            <span className="stat-label">Algoritmos ativos:</span>
            <strong>Filtragem Colaborativa · BFS</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
