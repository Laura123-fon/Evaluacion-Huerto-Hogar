package com.example.demo.security.filter;

import com.example.demo.service.CustomUserDetailsService;
import com.example.demo.security.jwt.JwtService;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // ⭐ NOTA: El SecurityConfig ya maneja las rutas públicas (.permitAll()),
        // por lo que ya no es necesario el 'if' que saltaba esas rutas.

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);

                // ⭐ VALIDAR EL TOKEN
                if (jwtService.isTokenValid(token)) {
                    String username = jwtService.extractUsername(token);

                    // ⭐ CARGAR EL USUARIO
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    // ⭐ CREAR LA AUTENTICACIÓN
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // ⭐ ESTABLECER LA AUTENTICACIÓN EN EL CONTEXTO DE SEGURIDAD
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    log.warn("❌ Token inválido o expirado para la ruta: {}", request.getRequestURI());
                }
            } catch (Exception e) {
                // Esto podría capturar errores de parsing del token o UserNotFound
                log.error("Error al procesar el token JWT: {}", e.getMessage());
            }
        } else {
            // Esto es normal si no es una ruta protegida. Solo advertimos si es DEBUG.
            log.debug("⚠️ No hay Authorization header con 'Bearer ' para la ruta: {}", request.getRequestURI());
        }

        filterChain.doFilter(request, response);
    }
}