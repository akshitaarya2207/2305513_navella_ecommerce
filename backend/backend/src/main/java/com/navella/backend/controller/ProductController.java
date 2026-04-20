package com.navella.backend.controller;

import com.navella.backend.entity.Product;
import com.navella.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // GET all products
    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }


    @PostMapping
    public ResponseEntity<?> addProduct(@Valid @RequestBody Product product) {
        return ResponseEntity.ok(service.addProduct(product));
    }


    @GetMapping("/filter")
    public ResponseEntity<?> getByCategory(@RequestParam String category) {
        return ResponseEntity.ok(service.getByCategory(category));
    }


    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestParam String name) {
        return ResponseEntity.ok(service.searchByName(name));
    }


    @GetMapping("/sort")
    public ResponseEntity<?> sortByPrice() {
        return ResponseEntity.ok(service.sortByPrice());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        return ResponseEntity.ok(service.updateProduct(id, product));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}