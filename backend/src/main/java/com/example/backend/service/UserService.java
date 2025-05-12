package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;

    public void registerUser(AuthRequest request) {
        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("USER");
        userRepo.save(user);
    }
}
