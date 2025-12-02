package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.security.jwt.JwtService;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthController(AuthenticationManager authManager, JwtService jwtService, UserService userService) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    // 🔹 Registro: solo username (correo) y password
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String role = "USER";

        if (username == null || password == null || username.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Correo y contraseña son requeridos"));
        }

        try {
            userService.register(username, password, role);
            return ResponseEntity.ok(Map.of("message", "Usuario registrado correctamente", "role", role));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "El usuario ya existe"));
        }
    }

    // 🔹 Login - Lógica simplificada
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        try {
            // Intenta autenticar. Lanza BadCredentialsException si falla.
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            // Si llega aquí, la autenticación fue exitosa. Buscamos el usuario.
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado después de autenticación exitosa"));

            String token = jwtService.generateToken(username, user.getRole());

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", username,
                    "role", user.getRole()
            ));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Correo o contraseña incorrectos"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Error interno: " + e.getMessage()));
        } catch (Exception e) {
            // Maneja otros errores como problemas de conexión a la BD, etc.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al procesar la solicitud"));
        }
    }

    // 🔹 Validar token
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken() {
        // Si llega a este punto (pasando el filtro JWT), el token es válido
        return ResponseEntity.ok(Map.of("valid", true));
    }
}