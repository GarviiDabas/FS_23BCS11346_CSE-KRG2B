package com.chandigarhuni.virtual_queue_system.controller;

import com.chandigarhuni.virtual_queue_system.dto.TokenStatusResponse;
import com.chandigarhuni.virtual_queue_system.model.Queue;
import com.chandigarhuni.virtual_queue_system.model.Token;
import com.chandigarhuni.virtual_queue_system.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tokens")
public class TokenController {

    @Autowired
    private TokenRepository tokenRepository;

    @GetMapping("/{id}")
    public ResponseEntity<TokenStatusResponse> getTokenStatus(@PathVariable Long id) {
        // 1. Get the token from DB or throw error
        Token token = tokenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Token not found"));

        Queue queue = token.getQueue();

        // 2. Count how many tokens are ahead of this user
        long position = tokenRepository.countByQueueAndStatusAndTokenNumberLessThan(
                queue, "WAITING", token.getTokenNumber()
        );

        // 3. Estimate wait time (avgServiceTime is assumed to be in minutes)
        long eta = position * queue.getAvgServiceTime();

        // 4. Build the response DTO
        TokenStatusResponse response = new TokenStatusResponse(
                queue.getName(),
                token.getTokenNumber(),
                queue.getCurrentTokenNumber(),
                eta,
                token.getStatus()
        );

        return ResponseEntity.ok(response);
    }
}
