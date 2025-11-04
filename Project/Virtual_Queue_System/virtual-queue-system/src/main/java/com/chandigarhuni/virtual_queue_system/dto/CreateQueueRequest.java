package com.chandigarhuni.virtual_queue_system.dto;

public class CreateQueueRequest {
    private String name;
    private int avgServiceTime;

    // --- Generate Getters and Setters ---
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
}