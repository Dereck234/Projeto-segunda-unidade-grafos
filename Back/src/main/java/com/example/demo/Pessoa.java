package com.example.demo;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.GeneratedValue;

@Node("Pessoa")
public class Pessoa {

    @Id @GeneratedValue
    private Long id;
    private String nome;

    // Construtor padrão (obrigatório do Spring Data)
    public Pessoa() {}

    public Pessoa(String nome) {
        this.nome = nome;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}