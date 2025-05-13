package com.example.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;

    public void registerUser(AuthRequest request) {
        logger.info("Starting user registration for email: {}", request.getEmail());
        logger.info("Username from request: {}", request.getUsername());
        
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            logger.warn("Email already exists: {}", request.getEmail());
            throw new RuntimeException("Email already exists");
        }
        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            logger.warn("Username already exists: {}", request.getUsername());
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("USER");
        
        logger.info("Saving user with username: {} and email: {}", user.getUsername(), user.getEmail());
        User savedUser = userRepo.save(user);
        logger.info("User saved successfully with ID: {}", savedUser.getId());
    }
}
