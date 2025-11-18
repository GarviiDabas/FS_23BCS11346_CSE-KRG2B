package com.chandigarhuni.virtual_queue_system.dto;

public class JoinQueueRequest {
    private Long queueId;
    private Long userId;

    // Default constructor
    public JoinQueueRequest() {
    }

    // Parameterized constructor
    public JoinQueueRequest(Long queueId, Long userId) {
        this.queueId = queueId;
        this.userId = userId;
    }

    // Getters
    public Long getQueueId() {
        return queueId;
    }

    public Long getUserId() {
        return userId;
    }

    // Setters
    public void setQueueId(Long queueId) {
        this.queueId = queueId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "JoinQueueRequest{" +
                "queueId=" + queueId +
                ", userId=" + userId +
                '}';
    }
}
