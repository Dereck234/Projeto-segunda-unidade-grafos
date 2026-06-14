package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins = "http://localhost:5173") // Permite o React acessar o Java
public class PessoaController {

    private final PessoaRepository repository;

    public PessoaController(PessoaRepository repository) {
        this.repository = repository;
    }

    // Rota para salvar uma pessoa: http://localhost:8080/api/pessoas?nome=Derec
    @PostMapping
    public Pessoa criarPessoa(@RequestParam String nome) {
        return repository.save(new Pessoa(nome));
    }

    // Rota para listar todas: http://localhost:8080/api/pessoas
    @GetMapping
    public List<Pessoa> listarTodas() {
        return repository.findAll();
    }
}