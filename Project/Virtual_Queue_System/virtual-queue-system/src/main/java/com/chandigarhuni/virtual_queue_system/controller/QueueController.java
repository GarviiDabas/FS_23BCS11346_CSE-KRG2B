package com.chandigarhuni.virtual_queue_system.controller;

import com.chandigarhuni.virtual_queue_system.dto.JoinQueueRequest; // <-- ADD
import com.chandigarhuni.virtual_queue_system.model.Queue;
import com.chandigarhuni.virtual_queue_system.model.Token; // <-- ADD
import com.chandigarhuni.virtual_queue_system.repository.QueueRepository;
import com.chandigarhuni.virtual_queue_system.service.CustomerService; // <-- ADD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <-- ADD
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QueueController {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private CustomerService customerService; // <-- ADD

    // --- Existing endpoint: get all active queues ---
    @GetMapping("/queues")
    public List<Queue> getActiveQueues() {
        return queueRepository.findAllByIsActive(true);
    }

// --- New endpoint: join a queue ---
    @PostMapping("/queues/join")
    public ResponseEntity<?> joinQueue(@RequestBody JoinQueueRequest joinRequest) {
        
        // --- ADD THIS DEBUG LINE ---
        System.out.println("===== JOIN QUEUE REQUEST RECEIVED =====");
        System.out.println("Received Queue ID: " + joinRequest.getQueueId());
        System.out.println("Received User ID:  " + joinRequest.getUserId());
        System.out.println("=========================================");
        // --- END OF DEBUG LINE ---

        try {
            Token newToken = customerService.joinQueue(joinRequest.getQueueId(), joinRequest.getUserId());
            return ResponseEntity.ok(newToken);
        } catch (RuntimeException e) {
            // This is what's sending the "id must not be null" message
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
