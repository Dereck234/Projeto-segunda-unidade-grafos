package com.example.demo.controller;

import com.example.demo.model.Livro;
import com.example.demo.model.Usuario;
import com.example.demo.service.RecomendacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final RecomendacaoService service;

    public UsuarioController(RecomendacaoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Usuario> listarTodos() {
        return service.listarUsuarios();
    }

    @PostMapping
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        return service.cadastrarUsuario(usuario);
    }

    @PostMapping("/{usuarioId}/curtir/{livroId}")
    public ResponseEntity<String> curtir(
            @PathVariable Long usuarioId,
            @PathVariable Long livroId) {
        service.curtir(usuarioId, livroId);
        return ResponseEntity.ok("Curtida registrada!");
    }

    @GetMapping("/{usuarioId}/curtidos")
    public List<Livro> livrosCurtidos(@PathVariable Long usuarioId) {
        return service.livrosCurtidosPor(usuarioId);
    }

    // Filtragem Colaborativa - endpoint principal
    @GetMapping("/{usuarioId}/recomendacoes")
    public List<Livro> recomendacoes(@PathVariable Long usuarioId) {
        return service.recomendarParaUsuario(usuarioId);
    }
}
