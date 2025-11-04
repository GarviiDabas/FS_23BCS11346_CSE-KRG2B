package com.chandigarhuni.virtual_queue_system.service;

import com.chandigarhuni.virtual_queue_system.model.Queue;
import com.chandigarhuni.virtual_queue_system.model.Token;
import com.chandigarhuni.virtual_queue_system.model.User;
import com.chandigarhuni.virtual_queue_system.repository.QueueRepository;
import com.chandigarhuni.virtual_queue_system.repository.TokenRepository;
import com.chandigarhuni.virtual_queue_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;

@Service
public class CustomerService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Transactional
    public Token joinQueue(Long queueId, Long userId) {
        // 1. Find the Queue and User
        Queue queue = queueRepository.findById(queueId)
                .orElseThrow(() -> new RuntimeException("Queue not found"));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check if user is already in this queue
        boolean alreadyInQueue = tokenRepository.findByQueueAndUserAndStatus(queue, user, "WAITING").isPresent();
        if (alreadyInQueue) {
            throw new RuntimeException("User is already in this queue");
        }

        // 3. Find the last token number issued for this queue
        int lastTokenNumber = tokenRepository.findTopByQueueOrderByTokenNumberDesc(queue)
                .map(Token::getTokenNumber)
                .orElse(0); // If no tokens, start at 0

        // 4. Create the new token
        Token newToken = new Token();
        newToken.setQueue(queue);
        newToken.setUser(user);
        newToken.setTokenNumber(lastTokenNumber + 1);
        newToken.setStatus("WAITING");

        // 5. Save and return the new token
        return tokenRepository.save(newToken);
    }
}