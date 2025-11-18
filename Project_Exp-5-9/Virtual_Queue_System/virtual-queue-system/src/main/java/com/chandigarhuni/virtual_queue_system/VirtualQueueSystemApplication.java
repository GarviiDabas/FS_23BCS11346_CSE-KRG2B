package com.chandigarhuni.virtual_queue_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync // Enable asynchronous processing
public class VirtualQueueSystemApplication {
	public static void main(String[] args) {
		SpringApplication.run(VirtualQueueSystemApplication.class, args);
	}

}
