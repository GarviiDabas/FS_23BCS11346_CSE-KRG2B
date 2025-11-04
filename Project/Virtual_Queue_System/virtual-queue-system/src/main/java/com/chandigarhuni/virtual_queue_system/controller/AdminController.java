package com.chandigarhuni.virtual_queue_system.controller;

import com.chandigarhuni.virtual_queue_system.model.Queue;
import com.chandigarhuni.virtual_queue_system.repository.QueueRepository;
import com.chandigarhuni.virtual_queue_system.service.AdminService;
import com.chandigarhuni.virtual_queue_system.dto.CreateQueueRequest;
import com.chandigarhuni.virtual_queue_system.dto.UpdateQueueRequest; // ✅ Added import

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private AdminService adminService;

    // --- ✅ Get all queues ---
    @GetMapping("/queues/all")
    public List<Queue> getAllQueues() {
        return queueRepository.findAll();
    }

    // --- ✅ Serve next token ---
    @PostMapping("/queues/serve-next")
    public ResponseEntity<Queue> serveNextToken(@RequestBody Map<String, Long> payload) {
        Long queueId = payload.get("queueId");
        Queue updatedQueue = adminService.serveNextToken(queueId);
        return ResponseEntity.ok(updatedQueue);
    }

    // --- ✅ Create new queue ---
    @PostMapping("/queues/create")
    public ResponseEntity<Queue> createNewQueue(@RequestBody CreateQueueRequest request) {
        try {
            Queue newQueue = adminService.createQueue(request.getName(), request.getAvgServiceTime());
            return ResponseEntity.ok(newQueue);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // --- ✅ Update existing queue ---
    @PutMapping("/queues/{id}")
    public ResponseEntity<Queue> updateQueue(
            @PathVariable Long id,
            @RequestBody UpdateQueueRequest request
    ) {
        try {
            Queue updatedQueue = adminService.updateQueue(
                    id,
                    request.getName(),
                    request.getAvgServiceTime(),
                    request.isActive()
            );
            return ResponseEntity.ok(updatedQueue);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
