package com.Spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		
	    Dotenv dotenv = Dotenv.load(); // Load .env file
        System.setProperty("DATASOURCE_URL", dotenv.get("DATASOURCE_URL"));
        System.setProperty("DATASOURCE_USER", dotenv.get("DATASOURCE_USER"));
        System.setProperty("DATASOURCE_PASSWORD", dotenv.get("DATASOURCE_PASSWORD"));
        System.setProperty("DATASOURCE_DRIVER", dotenv.get("DATASOURCE_DRIVER"));
		SpringApplication.run(TodoApplication.class, args);
	}

}
