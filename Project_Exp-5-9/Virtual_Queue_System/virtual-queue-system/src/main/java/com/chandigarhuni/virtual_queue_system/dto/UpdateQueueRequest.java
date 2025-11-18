package com.chandigarhuni.virtual_queue_system.dto;

public class UpdateQueueRequest {
    private String name;
    private int avgServiceTime;
    private boolean active; // Changed from isActive to active

    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAvgServiceTime() {
        return avgServiceTime;
    }
    
    public void setAvgServiceTime(int avgServiceTime) {
        this.avgServiceTime = avgServiceTime;
    }
    
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
}