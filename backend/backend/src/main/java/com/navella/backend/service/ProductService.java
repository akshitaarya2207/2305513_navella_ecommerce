package com.navella.backend.service;

import com.navella.backend.entity.Product;
import com.navella.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    // GET all
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // ADD product
    public Product addProduct(Product product) {
        return repo.save(product);
    }

    // FILTER by category
    public List<Product> getByCategory(String category) {
        return repo.findByCategory(category);
    }

    // SEARCH
    public List<Product> searchByName(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }

    // SORT
    public List<Product> sortByPrice() {
        return repo.findAll(Sort.by(Sort.Direction.ASC, "price"));
    }

    // UPDATE product
    public Product updateProduct(Long id, Product updatedProduct) {

        Product product = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setCategory(updatedProduct.getCategory());

        // OPTIONAL fields (safe update)
        product.setSubCategory(updatedProduct.getSubCategory());
        product.setTag(updatedProduct.getTag());
        product.setImageUrl(updatedProduct.getImageUrl());

        return repo.save(product);
    }

    // DELETE product
    public void deleteProduct(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        repo.deleteById(id);
    }
}