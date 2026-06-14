// Representa um nó Livro do Neo4j
export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  descricao: string;
  anoPublicacao: number;
}

// Representa um nó Usuario do Neo4j
export interface Usuario {
  id: number;
  nome: string;
  email: string;
}
