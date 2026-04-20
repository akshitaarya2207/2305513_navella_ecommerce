package com.navella.backend.repository;

import com.navella.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByCategoryAndSubCategory(String category, String subCategory);
    List<Product> findByPriceBetween(double min, double max);
    List<Product> findByCategoryAndTagAndPriceBetween(
            String category, String tag, double min, double max);
    List<Product> findByNameContainingIgnoreCase(String name);
}