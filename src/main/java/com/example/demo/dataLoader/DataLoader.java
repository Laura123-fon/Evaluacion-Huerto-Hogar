package com.example.demo.dataLoader;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.List;

public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {


        List<Product> products = List.of(
                new Product(0L, "producto", "descripcion", 10.29, 20, "https://i.pinimg.com/474x/35/db/a9/35dba9e5de0bdca31c0d88365e714f28.jpg", "origen", "sostenibilidad",
                        "categoria", "receta", 2.3),
                new Product(0L, "producto", "descripcion", 10.29, 20, "https://i.pinimg.com/474x/35/db/a9/35dba9e5de0bdca31c0d88365e714f28.jpg", "origen", "sostenibilidad",
                "categoria", "receta", 2.3)
        );

        productRepository.saveAll(products);
        System.out.println("Productos añadidos");

    }




}
