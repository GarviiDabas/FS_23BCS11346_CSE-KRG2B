package com.chandigarhuni.virtual_queue_system.dto;

import java.util.List;

public class QueueDetailsDTO {
    private String queueName;
    private List<TokenDetailsDTO> waitingTokens;

    // Constructor
    public QueueDetailsDTO(String queueName, List<TokenDetailsDTO> waitingTokens) {
        this.queueName = queueName;
        this.waitingTokens = waitingTokens;
    }

    // --- Generate Getters and Setters ---
    public String getQueueName() {
        return queueName;
    }
    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }
    public List<TokenDetailsDTO> getWaitingTokens() {
        return waitingTokens;
    }
    public void setWaitingTokens(List<TokenDetailsDTO> waitingTokens) {
        this.waitingTokens = waitingTokens;
    }
}