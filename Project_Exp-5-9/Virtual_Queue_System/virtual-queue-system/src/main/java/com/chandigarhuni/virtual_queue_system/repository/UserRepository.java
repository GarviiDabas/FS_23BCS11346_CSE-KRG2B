package com.chandigarhuni.virtual_queue_system.repository;

import com.chandigarhuni.virtual_queue_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // This gives us a "findByEmail" method for our login
    Optional<User> findByEmail(String email);
}