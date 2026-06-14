package com.example.demo;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PessoaRepository extends Neo4jRepository<Pessoa, Long> {

    // Customizado usando a linguagem CYPHER!
    @Query("MATCH (p:Pessoa) WHERE p.nome = $nome RETURN p")
    List<Pessoa> buscarPorNomeCustomizado(String nome);
}