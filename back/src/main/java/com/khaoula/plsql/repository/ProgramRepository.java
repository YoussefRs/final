package com.khaoula.plsql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.khaoula.plsql.models.Program;

import java.util.*;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    Optional<Program> findById(Long id);
    List<Program> findAll();
    Program save(Program program);
    void deleteById(Long id);
    
}
