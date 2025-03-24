package com.Spring.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Spring.Model.Todo;

@Repository
public interface Repo extends JpaRepository<Todo, Integer> {

}
