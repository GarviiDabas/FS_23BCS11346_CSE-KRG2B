package com.chandigarhuni.virtual_queue_system.controller;

import com.chandigarhuni.virtual_queue_system.dto.TokenStatusResponse;
import com.chandigarhuni.virtual_queue_system.model.Queue;
import com.chandigarhuni.virtual_queue_system.model.Token;
import com.chandigarhuni.virtual_queue_system.model.User;
import com.chandigarhuni.virtual_queue_system.repository.TokenRepository;
import com.chandigarhuni.virtual_queue_system.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tokens")
public class TokenController {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private CustomerService customerService;

    // ✅ 1. Get token status (Frontend calls this to show current queue status)
    @GetMapping("/{id}")
    public ResponseEntity<TokenStatusResponse> getTokenStatus(@PathVariable Long id) {
        Token token = tokenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Token not found"));

        Queue queue = token.getQueue();

        long position = tokenRepository.countByQueueAndStatusAndTokenNumberLessThan(
                queue, "WAITING", token.getTokenNumber()
        );

        long eta = position * queue.getAvgServiceTime();

        // ✅ Include token ID in response
        TokenStatusResponse response = new TokenStatusResponse(
                token.getTokenId(),               // <-- new field fix
                queue.getName(),
                token.getTokenNumber(),
                queue.getCurrentTokenNumber(),
                eta,
                token.getStatus()
        );

        return ResponseEntity.ok(response);
    }

    // ✅ 2. Cancel token (Customer can "Leave Queue")
    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelToken(@PathVariable Long id, @AuthenticationPrincipal User user) {
        try {
            customerService.cancelToken(id, user.getId());
            return ResponseEntity.ok().body("Token cancelled successfully");
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
