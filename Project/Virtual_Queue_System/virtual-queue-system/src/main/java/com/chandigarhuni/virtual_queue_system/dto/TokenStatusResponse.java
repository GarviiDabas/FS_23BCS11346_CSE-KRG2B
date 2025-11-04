package com.chandigarhuni.virtual_queue_system.dto;

public class TokenStatusResponse {
    private String queue_name;
    private int token_number;
    private int current_serving;
    private long estimated_wait_time;
    private String status;

    // Constructor
    public TokenStatusResponse(String queue_name, int token_number, int current_serving, long estimated_wait_time, String status) {
        this.queue_name = queue_name;
        this.token_number = token_number;
        this.current_serving = current_serving;
        this.estimated_wait_time = estimated_wait_time;
        this.status = status;
    }

    // Generate Getters and Setters
    public String getQueue_name() {
        return queue_name;
    }

    public void setQueue_name(String queue_name) {
        this.queue_name = queue_name;
    }

    public int getToken_number() {
        return token_number;
    }

    public void setToken_number(int token_number) {
        this.token_number = token_number;
    }

    public int getCurrent_serving() {
        return current_serving;
    }

    public void setCurrent_serving(int current_serving) {
        this.current_serving = current_serving;
    }

    public long getEstimated_wait_time() {
        return estimated_wait_time;
    }

    public void setEstimated_wait_time(long estimated_wait_time) {
        this.estimated_wait_time = estimated_wait_time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
