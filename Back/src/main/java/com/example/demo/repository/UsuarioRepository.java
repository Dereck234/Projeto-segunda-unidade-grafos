package com.example.demo.repository;

import com.example.demo.model.Livro;
import com.example.demo.model.Usuario;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends Neo4jRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    // FILTRAGEM COLABORATIVA
    @Query("""
        MATCH (eu:Usuario)-[:CURTIU]->(livroEmComum:Livro)<-[:CURTIU]-(vizinho:Usuario)
        WHERE id(eu) = $usuarioId AND eu <> vizinho
        MATCH (vizinho)-[:CURTIU]->(recomendacao:Livro)
        WHERE NOT (eu)-[:CURTIU]->(recomendacao)
        WITH recomendacao, count(DISTINCT vizinho) AS pontuacao
        ORDER BY pontuacao DESC
        LIMIT $limite
        RETURN recomendacao
    """)
    List<Livro> recomendarPorFiltragemColaborativa(Long usuarioId, int limite);

    @Query("""
        MATCH (u:Usuario), (l:Livro)
        WHERE id(u) = $usuarioId AND id(l) = $livroId
        MERGE (u)-[:CURTIU]->(l)
    """)
    void curtirLivro(Long usuarioId, Long livroId);

    @Query("""
        MATCH (u:Usuario)-[:CURTIU]->(l:Livro)
        WHERE id(u) = $usuarioId
        RETURN l
    """)
    List<Livro> listarLivrosCurtidos(Long usuarioId);
}
