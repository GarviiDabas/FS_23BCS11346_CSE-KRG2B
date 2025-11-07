package com.chandigarhuni.virtual_queue_system.service;
import java.util.stream.Collectors; // <-- ADD THIS IMPORT

import com.chandigarhuni.virtual_queue_system.dto.QueueDetailsDTO;
import com.chandigarhuni.virtual_queue_system.dto.TokenDetailsDTO;
import com.chandigarhuni.virtual_queue_system.model.Queue;
import com.chandigarhuni.virtual_queue_system.model.Token;
import com.chandigarhuni.virtual_queue_system.repository.QueueRepository;
import com.chandigarhuni.virtual_queue_system.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private NotificationService notificationService;

    // -----------------------------------------
    // ✅ Create a new queue
    // -----------------------------------------
    @Transactional
    public Queue createQueue(String name, int avgServiceTime) {
        if (name == null || name.isEmpty()) {
            throw new RuntimeException("Queue name cannot be empty");
        }
        if (avgServiceTime <= 0) {
            throw new RuntimeException("Average service time must be greater than 0");
        }

        Queue newQueue = new Queue();
        newQueue.setName(name);
        newQueue.setAvgServiceTime(avgServiceTime);
        newQueue.setCurrentTokenNumber(0);
        newQueue.setActive(true);

        return queueRepository.save(newQueue);
    }

    // -----------------------------------------
    // ✅ Update existing queue
    // -----------------------------------------
    @Transactional
    public Queue updateQueue(Long queueId, String newName, int newAvgServiceTime, boolean newIsActive) {
        // 1. Find the existing queue
        Queue queue = queueRepository.findById(queueId)
                .orElseThrow(() -> new RuntimeException("Queue not found with id: " + queueId));

        // 2. Validate new data
        if (newName == null || newName.isEmpty()) {
            throw new RuntimeException("Queue name cannot be empty");
        }
        if (newAvgServiceTime <= 0) {
            throw new RuntimeException("Average service time must be greater than 0");
        }

        // 3. Update fields
        queue.setName(newName);
        queue.setAvgServiceTime(newAvgServiceTime);
        queue.setActive(newIsActive);

        // 4. Save and return updated queue
        return queueRepository.save(queue);
    }

    // -----------------------------------------
    // ✅ Serve next token
    // -----------------------------------------
    @Transactional
    public Queue serveNextToken(Long queueId) {
        Queue queue = queueRepository.findById(queueId)
                .orElseThrow(() -> new RuntimeException("Queue not found"));

        List<Token> waitingTokens = tokenRepository.findByQueueAndStatus(queue, "WAITING");
        if (waitingTokens.isEmpty()) {
            return queue;
        }

        Token tokenToServe = waitingTokens.stream()
                .min(Comparator.comparing(Token::getTokenNumber))
                .orElseThrow(() -> new RuntimeException("No waiting tokens found"));

        tokenToServe.setStatus("SERVED");
        tokenToServe.setServedTime(java.time.LocalDateTime.now());
        queue.setCurrentTokenNumber(tokenToServe.getTokenNumber());

        tokenRepository.save(tokenToServe);
        Queue savedQueue = queueRepository.save(queue);

        waitingTokens.remove(tokenToServe);
        Optional<Token> nextTokenInLine = waitingTokens.stream()
                .min(Comparator.comparing(Token::getTokenNumber));

        if (nextTokenInLine.isPresent()) {
            notificationService.sendYourTurnIsNextEmail(nextTokenInLine.get().getUser());
        }

        return savedQueue;
    }
    @Transactional(readOnly = true) // This is a read-only operation
    public QueueDetailsDTO getQueueDetails(Long queueId) {
        // 1. Find the queue
        Queue queue = queueRepository.findById(queueId)
                .orElseThrow(() -> new RuntimeException("Queue not found"));

        // 2. Find all WAITING tokens for this queue
        List<Token> waitingTokens = tokenRepository.findByQueueAndStatus(queue, "WAITING");

        // 3. Sort them by token number and map them to our DTO
        List<TokenDetailsDTO> tokenDetails = waitingTokens.stream()
                .sorted(Comparator.comparing(Token::getTokenNumber))
                .map(token -> new TokenDetailsDTO(
                        token.getTokenNumber(),
                        token.getUser().getName() // Get the user's name
                ))
                .collect(Collectors.toList());

        // 4. Return the final DTO
        return new QueueDetailsDTO(queue.getName(), tokenDetails);
    }
}
