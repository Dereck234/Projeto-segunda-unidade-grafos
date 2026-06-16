// src/services/api.ts
// Camada que conversa com o backend Spring Boot.
// Todas as chamadas usam o prefixo /api, que o Vite redireciona para http://localhost:8080.

import type { Livro, Usuario } from '../types';

// Faz um GET e devolve o JSON já tipado. Se o servidor responder com erro, lança exceção.
async function getJSON<T>(url: string): Promise<T> {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao chamar ${url}`);
  }
  return resposta.json() as Promise<T>;
}

// Lista todos os livros — GET /api/livros
export function listarLivros(): Promise<Livro[]> {
  return getJSON<Livro[]>('/api/livros');
}

// Livros mais populares por nº de curtidas (centralidade de grau) — GET /api/livros/populares
export function livrosPopulares(): Promise<Livro[]> {
  return getJSON<Livro[]>('/api/livros/populares');
}

// Rede de livros similares (BFS pela relação SIMILAR_A) — GET /api/livros/{titulo}/rede
// encodeURIComponent trata títulos com espaços e acentos (ex.: "O Senhor dos Anéis").
export function redeDeLivro(titulo: string): Promise<Livro[]> {
  return getJSON<Livro[]>(`/api/livros/${encodeURIComponent(titulo)}/rede`);
}

// Lista os usuários — GET /api/usuarios
export function listarUsuarios(): Promise<Usuario[]> {
  return getJSON<Usuario[]>('/api/usuarios');
}

// Recomendações (filtragem colaborativa) de um usuário — GET /api/usuarios/{id}/recomendacoes
export function recomendacoesPara(usuarioId: number): Promise<Livro[]> {
  return getJSON<Livro[]>(`/api/usuarios/${usuarioId}/recomendacoes`);
}

// Livros curtidos (favoritos) de um usuário — GET /api/usuarios/{id}/curtidos
export function curtidosDe(usuarioId: number): Promise<Livro[]> {
  return getJSON<Livro[]>(`/api/usuarios/${usuarioId}/curtidos`);
}