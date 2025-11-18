package com.chandigarhuni.virtual_queue_system.controller;

import com.chandigarhuni.virtual_queue_system.dto.AuthResponse;
import com.chandigarhuni.virtual_queue_system.dto.LoginRequest;
import com.chandigarhuni.virtual_queue_system.dto.RegisterRequest;
import com.chandigarhuni.virtual_queue_system.model.User;
import com.chandigarhuni.virtual_queue_system.repository.UserRepository;
import com.chandigarhuni.virtual_queue_system.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    // ✅ LOGIN endpoint
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Fetch the authenticated user from DB
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String jwt = jwtUtils.generateToken(user);

        // Return JWT + user info
        return ResponseEntity.ok(
                new AuthResponse(jwt, user.getName(), user.getRole(), user.getId())
        );
    }

    // ✅ REGISTER endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {

        // Check for duplicate email
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user account
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // ✅ FIX: make sure your User entity has this field
        user.setContactNumber(registerRequest.getContactNumber());

        // Default role for customer
        user.setRole("ROLE_CUSTOMER");

        // Save to DB (table: app_users)
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
