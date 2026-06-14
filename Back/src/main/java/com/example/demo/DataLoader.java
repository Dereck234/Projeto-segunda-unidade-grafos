package com.example.demo;

import com.example.demo.model.Livro;
import com.example.demo.model.Usuario;
import com.example.demo.repository.LivroRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final LivroRepository livroRepository;
    private final UsuarioRepository usuarioRepository;

    public DataLoader(LivroRepository livroRepository, UsuarioRepository usuarioRepository) {
        this.livroRepository = livroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (livroRepository.count() > 0) {
            System.out.println(">> Banco ja possui dados. DataLoader pulado.");
            return;
        }

        System.out.println(">> Carregando dados iniciais no Neo4j...");

        Livro dom      = new Livro("Dom Casmurro",           "Machado de Assis",   "Romance",  "Classico da literatura brasileira", 1899);
        Livro memorias = new Livro("Memorias Postumas",      "Machado de Assis",   "Romance",  "Narrado por um defunto-autor",       1881);
        Livro senhor   = new Livro("O Senhor dos Aneis",     "J.R.R. Tolkien",     "Fantasia", "A batalha pelo Um Anel",             1954);
        Livro hobbit   = new Livro("O Hobbit",               "J.R.R. Tolkien",     "Fantasia", "A jornada de Bilbo Bolseiro",        1937);
        Livro harry    = new Livro("Harry Potter",           "J.K. Rowling",       "Fantasia", "O menino que sobreviveu",            1997);
        Livro narnia   = new Livro("As Cronicas de Narnia",  "C.S. Lewis",         "Fantasia", "Um mundo magico atras do guarda-roupa", 1950);
        Livro sapiens  = new Livro("Sapiens",                "Yuval Noah Harari",  "Historia", "Uma breve historia da humanidade",   2011);
        Livro cosmos   = new Livro("Cosmos",                 "Carl Sagan",         "Ciencia",  "Uma viagem pelo universo",           1980);

        // Relacionamentos SIMILAR_A (usados pelo BFS)
        dom.setSimilares(List.of(memorias));
        memorias.setSimilares(List.of(dom));
        senhor.setSimilares(List.of(hobbit, harry));
        hobbit.setSimilares(List.of(senhor, narnia));
        harry.setSimilares(List.of(hobbit, narnia));
        narnia.setSimilares(List.of(harry));
        sapiens.setSimilares(List.of(cosmos));
        cosmos.setSimilares(List.of(sapiens));

        livroRepository.saveAll(List.of(dom, memorias, senhor, hobbit, harry, narnia, sapiens, cosmos));

        // Usuarios com curtidas pre-definidas
        Usuario alice = new Usuario("Alice", "alice@email.com");
        Usuario bob   = new Usuario("Bob",   "bob@email.com");
        Usuario carol = new Usuario("Carol", "carol@email.com");

        alice.setLivrosCurtidos(List.of(senhor, hobbit, harry));
        bob.setLivrosCurtidos(List.of(senhor, hobbit, narnia));
        carol.setLivrosCurtidos(List.of(sapiens, cosmos));

        usuarioRepository.saveAll(List.of(alice, bob, carol));

        System.out.println(">> Pronto! 8 livros e 3 usuarios carregados com sucesso.");
    }
}
