package com.chandigarhuni.virtual_queue_system.repository;

import com.chandigarhuni.virtual_queue_system.model.Queue;
import com.chandigarhuni.virtual_queue_system.model.Token;
import com.chandigarhuni.virtual_queue_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    // Existing method — get all tokens for a specific queue and status
    List<Token> findByQueueAndStatus(Queue queue, String status);

    // ✅ New method 1: check if a user is already in a waiting queue
    Optional<Token> findByQueueAndUserAndStatus(Queue queue, User user, String status);

    // ✅ New method 2: get the last token issued in a queue
    Optional<Token> findTopByQueueOrderByTokenNumberDesc(Queue queue);

    long countByQueueAndStatusAndTokenNumberLessThan(Queue queue, String status, int tokenNumber);
}
