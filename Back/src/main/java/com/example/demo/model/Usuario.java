package com.example.demo.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

// Substitua o import
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@Node("Usuario")
// ❌ REMOVA O @JsonIdentityInfo DAQUI
public class Usuario {

    @Id @GeneratedValue
    private Long id;
    private String nome;
    private String email;

    @Relationship(type = "CURTIU", direction = Relationship.Direction.OUTGOING)
    // ✅ ADICIONE ESTA ANOTAÇÃO AQUI:
    @JsonIgnoreProperties("livrosCurtidos")
    private List<Livro> livrosCurtidos = new ArrayList<>();

    public Usuario() {}
    public Usuario(String nome, String email) { this.nome = nome; this.email = email; }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public List<Livro> getLivrosCurtidos() { return livrosCurtidos; }
    public void setLivrosCurtidos(List<Livro> livrosCurtidos) { this.livrosCurtidos = livrosCurtidos; }
}