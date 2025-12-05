package com.example.demo.dataLoader;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            ArrayList<Product> products = new ArrayList<>();

            products.add(new Product(null, "Tomate Cherry", "Tomates cherry dulces y jugosos, ideales para ensaladas y snacks. Cosecha propia.", 3.50, 150, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKB9qX5VwXyC4m9H1gaTzf4JG14MaXUeEdw&s", "Huerta local", "Cultivo sin pesticidas", "Frutas y Verduras", "Ensalada Caprese", 4.8));
            products.add(new Product(null, "Lechuga Romana", "Lechuga fresca y crujiente, perfecta para ensaladas César o bocadillos.", 1.80, 200, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr8XxrLtdq_S369cuTzNz8Wan4oS498u7tig&s", "Finca El Sol", "Uso eficiente del agua", "Frutas y Verduras", "Ensalada César", 4.5));
            products.add(new Product(null, "Humus de Lombriz (5L)", "Abono orgánico de alta calidad para mejorar la fertilidad del suelo y la salud de las plantas.", 12.00, 80, "https://static.wixstatic.com/media/f9d6e5_a0ff555e78044ec4b47b3ebe32534e1a~mv2.jpg/v1/fill/w_480,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/f9d6e5_a0ff555e78044ec4b47b3ebe32534e1a~mv2.jpg", "Compostaje El Roble", "Reciclaje de materia orgánica", "Fertilizantes", "Mezclar con la tierra de macetas", 4.9));
            products.add(new Product(null, "Kit de Cultivo de Aromáticas", "Incluye semillas de albahaca, perejil y cilantro, con macetas biodegradables.", 15.99, 50, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO_nqNyIiyz9Z_dO_7yLRm6dlRzA_0UMxZYQ&s", "Hecho a mano", "Materiales sostenibles", "Kits de Cultivo", "Ideal para cocina", 4.7));
            //Este link no funciona
            products.add(new Product(null, "Pimiento de Padrón", "Bolsa de pimientos de Padrón frescos. Como dice el dicho: 'unos pican y otros no'.", 4.20, 120, "https://upload.wikimedia.org/wikipedia/commons/5/54/Pementos_de_Padron.jpg", "Galicia, España", "Agricultura tradicional", "Frutas y Verduras", "Freír y añadir sal gorda", 4.6));


            productRepository.saveAll(products);
            System.out.println(products.size() + " productos añadidos a la base de datos.");
        } else {
            System.out.println("La base de datos ya contiene datos. No se han añadido nuevos productos.");
        }
    }
}
