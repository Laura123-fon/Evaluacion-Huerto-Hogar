package com.example.demo.dataLoader;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {

        if (productRepository.count() == 0) {

            ArrayList<Product> products = new ArrayList<>();

            products.add(new Product(
                    null,
                    "Manzanas Rojas Orgánicas",
                    "Manzanas frescas cultivadas sin pesticidas, crujientes y dulces, ideales para consumo diario.",
                    2990.0, 120,
                    "https://t3.ftcdn.net/jpg/01/97/74/06/360_F_197740683_DKN7suJCRufWcDL8k7OOS6PGWa5no6qs.jpg",
                    "Huertos del Valle", "Producción orgánica certificada", "Frutas",
                    "Snack saludable o repostería", 4.8, 35.0
            ));

            products.add(new Product(
                    null,
                    "Lechuga",
                    "Lechuga verde cultivada en sistema hidropónico, fresca y libre de tierra.",
                    1590.0, 80,
                    "https://previews.123rf.com/images/pstedrak/pstedrak1605/pstedrak160500007/56298470-garden-lettuce-background.jpg",
                    "Green Farm", "Cultivo sustentable", "Verduras",
                    "Base para ensaladas frescas", 4.6, 50.0
            ));

            products.add(new Product(
                    null,
                    "Zanahorias",
                    "Zanahorias dulces de tamaño pequeño, perfectas para snacks o comidas saludables.",
                    1890.0, 150,
                    "https://previews.123rf.com/images/utima/utima1701/utima170100016/70268277-organic-carrot-food-background.jpg",
                    "Campo Vivo", "Cosecha local", "Verduras",
                    "Ideal para guarniciones", 4.7, 40.0
            ));

            products.add(new Product(
                    null,
                    "Huevos de Campo Libre",
                    "Huevos frescos de gallinas criadas en libertad, alto valor nutricional.",
                    4990.0, 60,
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSjaS_HVhZeNZFrg0rmGxJQ-84M3M4okfTQ&s",
                    "Granja La Esperanza", "Bienestar animal", "Despensa",
                    "Preparaciones caseras", 4.9, 25.0
            ));

            products.add(new Product(
                    null,
                    "Pan Integral Artesanal",
                    "Pan horneado artesanalmente con harina integral y fermentación natural.",
                    2590.0, 40,
                    "https://static.vecteezy.com/system/resources/previews/003/141/248/non_2x/fresh-baked-brown-bread-on-a-brown-wooden-background-photo.JPG",
                    "Panadería Raíz", "Elaboración artesanal", "Panadería",
                    "Desayunos saludables", 4.8, 30.0
            ));

            products.add(new Product(
                    null,
                    "Cerezas Frescas",
                    "Cerezas dulces y jugosas recién cosechadas, de color rojo intenso y alto contenido de antioxidantes.",
                    6990.0, 35,
                    "https://previews.123rf.com/images/nik73/nik731707/nik73170700129/81544451-cherry-background-sweet-organic-cherries-on-market-counter.jpg",
                    "Huertos del Valle", "Cosecha de temporada", "Frutas",
                    "Postres, jugos y consumo directo", 4.7, 75.0
            ));

            products.add(new Product(
                    null,
                    "Mermelada de Frutilla Casera",
                    "Mermelada artesanal hecha con frutillas frescas y azúcar natural.",
                    3290.0, 90,
                    "https://media.lmneuquen.com/p/4f7c81370fa8238ff4b9176b34584386/adjuntos/195/imagenes/007/677/0007677685/1200x675/smart/mermelada-de-frutillas-1jpgwebp.png",
                    "Cocina del Campo", "Receta tradicional", "Despensa",
                    "Untable para pan o galletas", 4.6, 45.0
            ));

            products.add(new Product(
                    null,
                    "Hierbas Aromáticas Mix",
                    "Mix de hierbas frescas: albahaca, romero y tomillo, recién cosechadas.",
                    1990.0, 70,
                    "https://content-cocina.lecturas.com/medio/2021/07/15/hierbas-aromaticas_ca5d7c36_1200x1200.jpg",
                    "Huerta Verde", "Cultivo ecológico", "Hierbas",
                    "Condimento natural", 4.5, 60.0
            ));

            products.add(new Product(
                    null,
                    "Miel Cruda Natural",
                    "Miel sin filtrar ni pasteurizar, conserva todas sus propiedades naturales.",
                    8990.0, 50,
                    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=3000",
                    "Apiarios del Bosque", "Apicultura responsable", "Endulzantes",
                    "Infusiones y repostería", 4.9, 20.0
            ));

            products.add(new Product(
                    null,
                    "Aceite de Coco Virgen",
                    "Aceite de coco prensado en frío, ideal para cocina y cuidado personal.",
                    10990.0, 45,
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtz2LWcWPFaQvOn20vgDzAjlei6QseQt6-8g&s",
                    "Isla Natural", "Proceso artesanal", "Aceites",
                    "Cocina saludable", 4.8, 55.0
            ));

            productRepository.saveAll(products);
            System.out.println(">>> " + products.size() + " productos cargados correctamente.");

        } else {
            System.out.println(">>> La base de datos ya contiene productos. No se cargaron nuevos datos.");
        }
    }
}
