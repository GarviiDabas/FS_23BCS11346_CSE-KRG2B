package com.chandigarhuni.virtual_queue_system.repository;

import com.chandigarhuni.virtual_queue_system.model.Queue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QueueRepository extends JpaRepository<Queue, Long> {
    // This gives us a method to find only the active queues for the homepage
    List<Queue> findAllByIsActive(boolean isActive);
}