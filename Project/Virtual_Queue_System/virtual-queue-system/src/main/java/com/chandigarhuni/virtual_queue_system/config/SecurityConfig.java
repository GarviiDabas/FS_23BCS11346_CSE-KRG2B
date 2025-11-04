package com.chandigarhuni.virtual_queue_system.config;

import com.chandigarhuni.virtual_queue_system.security.JwtAuthFilter;
import com.chandigarhuni.virtual_queue_system.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (This is the most important fix)
            .csrf(csrf -> csrf.disable())
            
            // 2. Configure CORS
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(List.of("http://localhost:5173")); // Your React app
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                config.setAllowCredentials(true);
                return config;
            }))
            
            // 3. Set session management to STATELESS
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 4. Define authorization rules
            .authorizeHttpRequests(auth -> auth
                // Allow all pre-flight OPTIONS requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
                
                // Allow all requests to auth endpoints
                .requestMatchers("/api/auth/**").permitAll()
                
                // Allow GET requests for public queues
                .requestMatchers(HttpMethod.GET, "/api/queues").permitAll()
                
                // Secure Admin endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                
                // Secure Customer endpoints
                .requestMatchers("/api/tokens/**").hasRole("CUSTOMER")
                .requestMatchers(HttpMethod.POST, "/api/queues/join").hasRole("CUSTOMER")
                
                // All other requests must be authenticated
                .anyRequest().authenticated()
            )
            
            // 5. Add our JWT filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
            
        return http.build();
    }
}