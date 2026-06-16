package com.example.demo.repository;

import com.example.demo.model.Livro;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LivroRepository extends Neo4jRepository<Livro, Long> {

    List<Livro> findByGenero(String genero);

    @Query("""
        MATCH (inicio:Livro {titulo: $titulo})-[:SIMILAR_A*1..3]->(livro:Livro)
        WHERE livro.titulo <> $titulo
        RETURN DISTINCT livro
        LIMIT 20
    """)
    List<Livro> redeDeConexoes(String titulo);

    @Query("""
        MATCH (livro:Livro)
        OPTIONAL MATCH (livro)<-[c:CURTIU]-(:Usuario)
        WITH livro, count(c) AS curtidas
        ORDER BY curtidas DESC
        RETURN livro
        LIMIT 10
    """)
    List<Livro> livrosMaisPopulares();
}