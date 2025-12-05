package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado con id: " + id));
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto a actualizar no encontrado con id: " + id));

        existing.setNombre(updated.getNombre());
        existing.setDescripcion(updated.getDescripcion());
        existing.setPrecio(updated.getPrecio());
        existing.setStock(updated.getStock());
        existing.setImagenUrl(updated.getImagenUrl());
        existing.setOrigen(updated.getOrigen());
        existing.setSostenibilidad(updated.getSostenibilidad());
        existing.setCategoria(updated.getCategoria());
        existing.setReceta(updated.getReceta());
        existing.setCalificacion(updated.getCalificacion());

        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}