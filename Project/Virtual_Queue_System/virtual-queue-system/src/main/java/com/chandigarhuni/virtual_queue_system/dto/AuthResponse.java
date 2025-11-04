package com.chandigarhuni.virtual_queue_system.dto;

public class AuthResponse {
    private String token;
    private String name;
    private String role;
    private Long id; // ✅ Added field for user ID

    // ✅ Updated constructor with 'id'
    public AuthResponse(String token, String name, String role, Long id) {
        this.token = token;
        this.name = name;
        this.role = role;
        this.id = id;
    }

    // --- Getters and Setters ---
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
