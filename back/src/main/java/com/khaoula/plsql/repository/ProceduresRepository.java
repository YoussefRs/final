package com.khaoula.plsql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.khaoula.plsql.models.Procedures;

import java.util.*;

@Repository
public interface ProceduresRepository extends JpaRepository<Procedures, Long> {
    Optional<Procedures> findById(Long id);
    List<Procedures> findAll();
    Procedures save(Procedures program);
    void deleteById(Long id);
    
}
