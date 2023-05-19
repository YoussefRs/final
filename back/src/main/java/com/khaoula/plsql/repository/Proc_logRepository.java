package com.khaoula.plsql.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.khaoula.plsql.models.Proc_log;

@Repository
public interface Proc_logRepository extends JpaRepository<Proc_log, Long> {
	List<Proc_log> findAll();
}
