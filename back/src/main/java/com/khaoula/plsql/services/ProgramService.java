package com.khaoula.plsql.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;

import com.khaoula.plsql.models.Procedures;
import com.khaoula.plsql.repository.ProceduresRepository;

@Service
public class ProgramService {

    @Autowired
    private ProceduresRepository programRepository;

    public List<Procedures> getAllPrograms() {
        return programRepository.findAll();
    }

    public Optional<Procedures> getProgramById(Long id) {
        return programRepository.findById(id);
    }

    public Procedures createProgram(Procedures program) {
        return programRepository.save(program);
    }

 

    public void deleteProgramById(Long id) {
        programRepository.deleteById(id);
    }
}
