package com.navella.backend.controller;

import com.navella.backend.entity.User;
import com.navella.backend.service.UserService;
import com.navella.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService service;

    @Autowired
    private UserRepository userRepository;   // ✅ NOW CORRECT

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        User existing = userRepository.findByEmail(user.getEmail());

        if (existing != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        return ResponseEntity.ok(service.register(user));
    }
    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        user.setEmail(user.getEmail().toLowerCase());
        User u = userRepository.findByEmail(user.getEmail());

        if (u != null && u.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(u);
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}