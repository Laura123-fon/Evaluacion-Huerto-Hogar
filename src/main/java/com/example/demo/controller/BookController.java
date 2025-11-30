package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/books")
@Tag(name = "Books", description = "Book Management System")
public class BookController {

    @Autowired
    private BookService bookService;

    // ✅ Todos pueden consultar libros (USER y ADMIN)
    @GetMapping
    @Operation(summary = "View a list of available books")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // ✅ Todos pueden ver un libro específico
    @GetMapping("/{id}")
    @Operation(summary = "Get a book by Id")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // 🔒 Solo ADMIN puede crear libros
    @PostMapping
    @Operation(summary = "Add a new book (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public Book createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    // 🔒 Solo ADMIN puede actualizar libros
    @PutMapping("/{id}")
    @Operation(summary = "Update an existing book (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        Book existingBook = bookService.getBookById(id);
        if (existingBook != null) {
            existingBook.setTitle(book.getTitle());
            existingBook.setAuthor(book.getAuthor());
            return bookService.saveBook(existingBook);
        }
        return null;
    }

    // 🔒 Solo ADMIN puede eliminar libros
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a book (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}
