package com.navella.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;


    @Entity
    public class Product {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotNull
        private String name;

        @Min(1)
        private double price;
        private String category;
        private String subCategory;
        private String tag;
        private String imageUrl;   // 👈 ADD HERE

        // Getter and Setter for id
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        // Getter and Setter for name
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        // Getter and Setter for price
        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        // Getter and Setter for category
        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        // Getter and Setter for subCategory
        public String getSubCategory() {
            return subCategory;
        }

        public void setSubCategory(String subCategory) {
            this.subCategory = subCategory;
        }

        // Getter and Setter for tag
        public String getTag() {
            return tag;
        }

        public void setTag(String tag) {
            this.tag = tag;
        }
        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }
