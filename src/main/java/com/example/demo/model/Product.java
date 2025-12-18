package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column private String nombre;
    @Column private String descripcion;
    @Column private Double precio;
    @Column private Integer stock;
    @Column private String imagenUrl;
    @Column private String origen;
    @Column private String sostenibilidad;
    @Column private String categoria;
    @Column private String receta;
    @Column private Double calificacion;
    @Column private Double descuento;

}
