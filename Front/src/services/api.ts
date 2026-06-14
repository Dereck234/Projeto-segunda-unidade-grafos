import type { Livro, Usuario } from '../types';

// Com o proxy do Vite, não precisamos mais do endereço completo.
// /api é redirecionado automaticamente para http://localhost:8080/api
const BASE = '/api';

// ── Livros ──────────────────────────────────────────────────────────────────

export async function getLivros(): Promise<Livro[]> {
  const res = await fetch(`${BASE}/livros`);
  if (!res.ok) throw new Error('Erro ao buscar livros');
  return res.json();
}

export async function cadastrarLivro(livro: Omit<Livro, 'id'>): Promise<Livro> {
  const res = await fetch(`${BASE}/livros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(livro),
  });
  if (!res.ok) throw new Error('Erro ao cadastrar livro');
  return res.json();
}

export async function getRedeLivros(titulo: string, profundidade = 2): Promise<Livro[]> {
  const res = await fetch(
    `${BASE}/livros/${encodeURIComponent(titulo)}/rede?profundidade=${profundidade}`
  );
  if (!res.ok) throw new Error('Erro ao buscar rede');
  return res.json();
}

// ── Usuários ────────────────────────────────────────────────────────────────

export async function getUsuarios(): Promise<Usuario[]> {
  const res = await fetch(`${BASE}/usuarios`);
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}

export async function cadastrarUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
  const res = await fetch(`${BASE}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  if (!res.ok) throw new Error('Erro ao cadastrar usuário');
  return res.json();
}

export async function curtirLivro(usuarioId: number, livroId: number): Promise<void> {
  const res = await fetch(`${BASE}/usuarios/${usuarioId}/curtir/${livroId}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Erro ao curtir livro');
}

export async function getLivrosCurtidos(usuarioId: number): Promise<Livro[]> {
  const res = await fetch(`${BASE}/usuarios/${usuarioId}/curtidos`);
  if (!res.ok) throw new Error('Erro ao buscar curtidos');
  return res.json();
}

export async function getRecomendacoes(usuarioId: number): Promise<Livro[]> {
  const res = await fetch(`${BASE}/usuarios/${usuarioId}/recomendacoes`);
  if (!res.ok) throw new Error('Erro ao buscar recomendações');
  return res.json();
}
