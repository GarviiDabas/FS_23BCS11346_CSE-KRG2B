package com.chandigarhuni.virtual_queue_system.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "queues")
public class Queue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long queueId;

    @Column(nullable = false)
    private String name;

    private int avgServiceTime; 

    private int currentTokenNumber; 

    private boolean isActive;

    @OneToMany(mappedBy = "queue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens;

    // --- Getters and Setters ---
    public Long getQueueId() {
        return queueId;
    }

    public void setQueueId(Long queueId) {
        this.queueId = queueId;
    }

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

    public int getCurrentTokenNumber() {
        return currentTokenNumber;
    }

    public void setCurrentTokenNumber(int currentTokenNumber) {
        this.currentTokenNumber = currentTokenNumber;
    }

    public boolean isActive() {
        return isActive;
    }

    // --- THIS IS THE FIX ---
    // Removed the three dots "..." from "boolean... active"
    public void setActive(boolean active) {
        this.isActive = active;
    }
    // --- END OF FIX ---

    public List<Token> getTokens() {
        return tokens;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }
}