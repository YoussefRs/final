package com.khaoula.plsql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.khaoula.plsql.models.ProcLog;

@Repository
public interface ProcLogRepository extends JpaRepository<ProcLog, Long> {
	List<ProcLog> findAll();
}
