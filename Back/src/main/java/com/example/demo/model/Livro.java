package com.example.demo.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

// Substitua o import do IdentityInfo por este:
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@Node("Livro")
// ❌ REMOVA O @JsonIdentityInfo DAQUI
public class Livro {

    @Id @GeneratedValue
    private Long id;
    private String titulo;
    private String autor;
    private String genero;
    private String descricao;
    private Integer anoPublicacao;

    @Relationship(type = "SIMILAR_A", direction = Relationship.Direction.OUTGOING)
    // ✅ ADICIONE ESTA ANOTAÇÃO AQUI:
    @JsonIgnoreProperties("similares")
    private List<Livro> similares = new ArrayList<>();

    public Livro() {}
    public Livro(String titulo, String autor, String genero, String descricao, Integer anoPublicacao) {
        this.titulo = titulo; this.autor = autor; this.genero = genero;
        this.descricao = descricao; this.anoPublicacao = anoPublicacao;
    }

    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getAutor() { return autor; }
    public void setAutor(String autor) { this.autor = autor; }
    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public Integer getAnoPublicacao() { return anoPublicacao; }
    public void setAnoPublicacao(Integer anoPublicacao) { this.anoPublicacao = anoPublicacao; }
    public List<Livro> getSimilares() { return similares; }
    public void setSimilares(List<Livro> similares) { this.similares = similares; }
}