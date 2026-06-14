package com.example.demo.service;

import com.example.demo.model.Livro;
import com.example.demo.model.Usuario;
import com.example.demo.repository.LivroRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class RecomendacaoService {

    private final LivroRepository livroRepository;
    private final UsuarioRepository usuarioRepository;
    private final Neo4jClient neo4jClient;

    public RecomendacaoService(LivroRepository livroRepository,
                               UsuarioRepository usuarioRepository,
                               Neo4jClient neo4jClient) {
        this.livroRepository = livroRepository;
        this.usuarioRepository = usuarioRepository;
        this.neo4jClient = neo4jClient;
    }

    // FILTRAGEM COLABORATIVA
    public List<Livro> recomendarParaUsuario(Long usuarioId) {
        return usuarioRepository.recomendarPorFiltragemColaborativa(usuarioId, 10);
    }

    // BFS com profundidade variavel via Neo4jClient
    // Obs: Cypher nao aceita parametro ($n) em range de path *1..$n,
    // entao embutimos o inteiro diretamente (seguro: eh int controlado 1-4)
    public List<Livro> explorarRedeDeLivros(String titulo, int profundidade) {
        int depth = Math.max(1, Math.min(profundidade, 4));

        String cypher = String.format(
            "MATCH (inicio:Livro {titulo: $titulo})-[:SIMILAR_A*1..%d]->(livro:Livro) " +
            "WHERE livro.titulo <> $titulo " +
            "RETURN DISTINCT livro.titulo AS titulo, livro.autor AS autor, " +
            "livro.genero AS genero, livro.descricao AS descricao, " +
            "livro.anoPublicacao AS anoPublicacao LIMIT 20", depth
        );

        Collection<Livro> resultado = neo4jClient.query(cypher)
            .bind(titulo).to("titulo")
            .fetchAs(Livro.class)
            .mappedBy((typeSystem, record) -> {
                Livro l = new Livro();
                l.setTitulo(record.get("titulo").asString(""));
                l.setAutor(record.get("autor").asString(""));
                l.setGenero(record.get("genero").asString(""));
                l.setDescricao(record.get("descricao").asString(""));
                if (!record.get("anoPublicacao").isNull()) {
                    l.setAnoPublicacao(record.get("anoPublicacao").asInt());
                }
                return l;
            })
            .all();

        return List.copyOf(resultado);
    }

    public List<Livro> listarTodosLivros()               { return livroRepository.findAll(); }
    public List<Livro> livrosCurtidosPor(Long usuarioId) { return usuarioRepository.listarLivrosCurtidos(usuarioId); }

    @Transactional
    public void curtir(Long usuarioId, Long livroId)     { usuarioRepository.curtirLivro(usuarioId, livroId); }

    @Transactional
    public Livro cadastrarLivro(Livro livro)             { return livroRepository.save(livro); }

    @Transactional
    public Usuario cadastrarUsuario(Usuario usuario)     { return usuarioRepository.save(usuario); }

    public List<Usuario> listarUsuarios()                { return usuarioRepository.findAll(); }
    public Optional<Usuario> buscarUsuario(Long id)      { return usuarioRepository.findById(id); }
}
