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

import java.util.Optional; // <-- Make sure this is imported

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
        Queue queue = queueRepository.findById(queueId)
                .orElseThrow(() -> new RuntimeException("Queue not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // FIX: Check if user is already in queue, if so, just return their token
        Optional<Token> existingToken = tokenRepository.findByQueueAndUserAndStatus(queue, user, "WAITING");
        if (existingToken.isPresent()) {
            return existingToken.get();
        }

        int lastTokenNumber = tokenRepository.findTopByQueueOrderByTokenNumberDesc(queue)
                .map(Token::getTokenNumber)
                .orElse(0); 

        Token newToken = new Token();
        newToken.setQueue(queue);
        newToken.setUser(user);
        newToken.setTokenNumber(lastTokenNumber + 1);
        newToken.setStatus("WAITING");

        return tokenRepository.save(newToken);
    }

    @Transactional
    public Token cancelToken(Long tokenId, Long userId) {
        
        // --- THIS IS THE FIX ---
        // 1. Find the token *and* verify ownership at the same time.
        // This avoids the LazyInitializationException.
        Token token = tokenRepository.findByTokenIdAndUser_Id(tokenId, userId)
                .orElseThrow(() -> new SecurityException("Token not found or user does not have permission"));
        // --- END OF FIX ---
        
        if (!"WAITING".equals(token.getStatus())) {
            throw new RuntimeException("Token cannot be cancelled (already served or cancelled)");
        }

        token.setStatus("CANCELLED");
        return tokenRepository.save(token);
    }
}