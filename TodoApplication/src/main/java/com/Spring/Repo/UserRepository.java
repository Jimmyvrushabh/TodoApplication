package com.Spring.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Spring.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	 User findByUsername(String username);
}


