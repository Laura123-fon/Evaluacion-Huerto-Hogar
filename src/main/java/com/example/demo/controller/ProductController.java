package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Product Management System for Huerto Hogar")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Usuarios y administradores pueden ver productos
    @GetMapping
    @Operation(summary = "View a list of available products")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a product by Id")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Solo Admin puede crear
    @PostMapping
    @Operation(summary = "Add a new product (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Solo Admin puede actualizar
    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // Solo Admin puede eliminar
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a product (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
