package com.navella.backend.service;

import com.navella.backend.entity.User;
import com.navella.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // Register
    public User register(User user) {
        return repo.save(user);
    }

    // Login
    public User login(String email, String password) {
        User u = repo.findByEmail(email);

        if (u != null && u.getPassword().equals(password)) {
            return u;
        }

        return null;
    }
}