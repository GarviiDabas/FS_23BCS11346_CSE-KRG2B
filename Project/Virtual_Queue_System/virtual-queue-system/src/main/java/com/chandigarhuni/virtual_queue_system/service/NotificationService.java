package com.chandigarhuni.virtual_queue_system.service;

import com.chandigarhuni.virtual_queue_system.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class NotificationService {

    @Value("${resend.api.key}")
    private String apiKey;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Async // This makes the method run in a separate thread
    public void sendYourTurnIsNextEmail(User user) {
        
        String subject = "Your Turn is Next!";
        String htmlBody = "<h1>Hi " + user.getName() + ",</h1>"
                        + "<p>You are next in line! Please make your way to the counter.</p>";

        // 1. Create the JSON payload as a String
        // We must escape the quotes in the HTML
        String jsonPayload = String.format(
            "{\"from\": \"Queue System <onboarding@resend.dev>\", \"to\": [\"%s\"], \"subject\": \"%s\", \"html\": \"%s\"}",
            user.getEmail(),
            subject,
            htmlBody.replace("\"", "\\\"") // Escape quotes for JSON
        );

        // 2. Build the HTTP request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.resend.com/emails"))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        // 3. Send the request
        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                System.out.println("Notification email sent to: " + user.getEmail());
            } else {
                System.err.println("Error sending email, status code: " + response.statusCode());
                System.err.println("Response body: " + response.body());
            }
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}