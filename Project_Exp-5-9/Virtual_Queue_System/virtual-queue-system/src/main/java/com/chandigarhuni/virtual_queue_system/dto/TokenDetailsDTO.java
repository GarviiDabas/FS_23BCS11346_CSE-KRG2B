package com.chandigarhuni.virtual_queue_system.dto;

public class TokenDetailsDTO {
    private int tokenNumber;
    private String userName;

    // Constructor
    public TokenDetailsDTO(int tokenNumber, String userName) {
        this.tokenNumber = tokenNumber;
        this.userName = userName;
    }

    // --- Generate Getters and Setters ---
    public int getTokenNumber() {
        return tokenNumber;
    }
    public void setTokenNumber(int tokenNumber) {
        this.tokenNumber = tokenNumber;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
}