package com.example.demo.controller;

import com.example.demo.model.Livro;
import com.example.demo.service.RecomendacaoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://localhost:5173")
public class LivroController {

    private final RecomendacaoService service;

    public LivroController(RecomendacaoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Livro> listarTodos() {
        return service.listarTodosLivros();
    }

    @PostMapping
    public Livro cadastrar(@RequestBody Livro livro) {
        return service.cadastrarLivro(livro);
    }

    // BFS - profundidade variavel via query param
    @GetMapping("/{titulo}/rede")
    public List<Livro> redeDeLivros(
            @PathVariable String titulo,
            @RequestParam(defaultValue = "2") int profundidade) {
        return service.explorarRedeDeLivros(titulo, profundidade);
    }
}
