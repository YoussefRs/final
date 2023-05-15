package com.khaoula.plsql.controllers;

import org.springframework.beans.factory.annotation.Autowired;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.khaoula.plsql.models.ProcLog;
import com.khaoula.plsql.models.Program;
import com.khaoula.plsql.repository.ProcLogRepository;
import com.khaoula.plsql.requests.ProcLogResponse;
import com.khaoula.plsql.requests.ProcedureCreateRequest;
import com.khaoula.plsql.requests.ProcedureResponse;
import com.khaoula.plsql.services.ProgramService;

import org.springframework.http.MediaType;




@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/programs")
public class ProcedureController {
	
    @Autowired
    private ProgramService programService;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    private ProcLogRepository procLogRepository;

   
    
    @PostMapping(path = "/procedures", consumes = "application/sql")
    public ResponseEntity<ProcedureResponse> createProcedure(@RequestBody String sql) {
        String name = extractProcedureName(sql);
        jdbcTemplate.update("INSERT INTO procedures (name, text) VALUES (?, ?)", name, sql);
        jdbcTemplate.execute(sql);
        return ResponseEntity.ok(new ProcedureResponse("Procedure created successfully"));
    }

    private String extractProcedureName(String sql) {
        Pattern pattern = Pattern.compile("(?i)PROCEDURE\\s+([\\w_]+)");
        Matcher matcher = pattern.matcher(sql);
        if (matcher.find()) {
            return matcher.group(1);
        }
        throw new IllegalArgumentException("Could not extract procedure name from SQL string");
    }
    
    @GetMapping("/procedures")
    public List<ProcedureResponse> getAllProcedures() {
        String sql = "SELECT id, name, text, (SELECT COUNT(*) FROM procedures) AS count FROM procedures";
        List<Map<String, Object>> procedureList = jdbcTemplate.queryForList(sql);
        List<ProcedureResponse> procedures = new ArrayList<>();
        for (Map<String, Object> procedure : procedureList) {
            int id = ((BigDecimal) procedure.get("id")).intValue();
            String name = procedure.get("name").toString();
            String text = procedure.get("text").toString();
            ProcedureResponse procedureResponse = new ProcedureResponse(id, name, text);
            procedures.add(procedureResponse);
        }
        return procedures;
    }
    
    @PostMapping("/procedures/{procedureName}")
    public ResponseEntity<ProcedureResponse> executeProcedure(@PathVariable String procedureName) {
        String sql = "{CALL " + procedureName + "}";
        String procedureCode = null;
        try (Connection conn = jdbcTemplate.getDataSource().getConnection()) {
            // Retrieve procedure definition from the database
            try (PreparedStatement ps = conn.prepareStatement("SELECT text FROM procedures WHERE name = ?")) {
                ps.setString(1, procedureName);
                ResultSet rs = ps.executeQuery();
                StringBuilder sb = new StringBuilder();
                while (rs.next()) {
                    sb.append(rs.getString("TEXT"));
                }
                procedureCode = sb.toString();
            }
            CallableStatement stmt = conn.prepareCall(sql);
            stmt.execute();
            ProcLog procLog = new ProcLog();
            procLog.setName(procedureName);
            procLog.setBody(procedureCode);
            procLog.setStatus("success");
            procLogRepository.save(procLog);
            return ResponseEntity.ok(new ProcedureResponse("Execution avec succés!"));
        } catch (SQLException e) {
            try (Connection conn = jdbcTemplate.getDataSource().getConnection();
                 PreparedStatement ps = conn.prepareStatement("SELECT * FROM ALL_ERRORS WHERE NAME = ?")) {
                ps.setString(1, procedureName);
                ResultSet rs = ps.executeQuery();
                List<Map<String, Object>> errorList = new ArrayList<>();
                while (rs.next()) {
                    Map<String, Object> errorMap = new HashMap<>();
                    errorMap.put("name", rs.getString("NAME"));
                    errorMap.put("type", rs.getString("TYPE"));
                    errorMap.put("line", rs.getInt("LINE"));
                    errorMap.put("position", rs.getInt("POSITION"));
                    String errorText = rs.getString("TEXT");
                    errorMap.put("text", errorText);
                    errorList.add(errorMap);

                    ProcLog procLog = new ProcLog();
                    procLog.setName(procedureName);
                    procLog.setBody(procedureCode);
                    procLog.setStatus("error");
                    procLog.setError(errorText);
                    procLogRepository.save(procLog);
                }

                return ResponseEntity.ok(new ProcedureResponse(errorList));
            } catch (SQLException ex) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ProcedureResponse("An error occurred while retrieving the error: " + ex.getMessage()));
            }
        }
    }
    
//    @PostMapping("/procedures/{procedureName}")
//    public ResponseEntity<ProcedureResponse> executeProcedure(@PathVariable String procedureName) {
//    String sql = "{CALL " + procedureName + "}";
//    String procedureCode = null;
//    try (Connection conn = jdbcTemplate.getDataSource().getConnection()) {
//    // Retrieve procedure definition from the database
//    try (PreparedStatement ps = conn.prepareStatement("SELECT text FROM procedures WHERE name = ?")) {
//    ps.setString(1, procedureName);
//    ResultSet rs = ps.executeQuery();
//    if (rs.next()) {
//    procedureCode = rs.getString("text");
//    } else {
//    return ResponseEntity.status(HttpStatus.NOT_FOUND)
//    .body(new ProcedureResponse("Procedure not found"));
//    }
//    }
//    CallableStatement stmt = conn.prepareCall(procedureCode);
//    stmt.execute();
//    ProcLog procLog = new ProcLog();
//    procLog.setName(procedureName);
//    procLog.setBody(procedureCode);
//    procLog.setStatus("success");
//    procLogRepository.save(procLog);
//    return ResponseEntity.ok(new ProcedureResponse("Executed successfully"));
//    } catch (SQLException e) {
//    try (Connection conn = jdbcTemplate.getDataSource().getConnection();
//    PreparedStatement ps = conn.prepareStatement("SELECT * FROM ALL_ERRORS WHERE NAME = ?")) {
//    ps.setString(1, procedureName);
//    ResultSet rs = ps.executeQuery();
//    List<Map<String, Object>> errorList = new ArrayList<>();
//    while (rs.next()) {
//    Map<String, Object> errorMap = new HashMap<>();
//    errorMap.put("name", rs.getString("NAME"));
//    errorMap.put("type", rs.getString("TYPE"));
//    errorMap.put("line", rs.getInt("LINE"));
//    errorMap.put("position", rs.getInt("POSITION"));
//    String errorText = rs.getString("TEXT");
//    errorMap.put("text", errorText);
//    errorList.add(errorMap);
//
//                ProcLog procLog = new ProcLog();
//                procLog.setName(procedureName);
//                procLog.setBody(procedureCode);
//                procLog.setStatus("error");
//                procLog.setError(errorText);
//                procLogRepository.save(procLog);
//            }
//
//            return ResponseEntity.ok(new ProcedureResponse(errorList));
//        } catch (SQLException ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ProcedureResponse("An error occurred while retrieving the error: " + ex.getMessage()));
//        }
//    }
//   }

    
    
    @GetMapping("/procedures/logs")
    public ProcLogResponse getProcLogs() {
        List<ProcLog> procLogs = procLogRepository.findAll();
        return new ProcLogResponse(procLogs);
    }
    
    @PutMapping(path = "/procedures/{name}", consumes = "application/sql")
    public ResponseEntity<ProcedureResponse> updateProcedureText(@PathVariable String name, @RequestBody String sql) {
        jdbcTemplate.update("UPDATE procedures SET text = ? WHERE name = ?", sql, name);
        return ResponseEntity.ok(new ProcedureResponse("Procedure text updated successfully"));
    }
    
    @GetMapping("/procedures/stats")
    public Map<String, Integer> getProcedureStats() {
        String sql = "SELECT COUNT(DISTINCT name) AS proc_count, " +
                     "COUNT(*) AS total_count, " +
                     "SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS success_count " +
                     "FROM proc_log";
        Map<String, Object> result = jdbcTemplate.queryForMap(sql);
        int procCount = ((BigDecimal) result.get("PROC_COUNT")).intValue();
        int totalCount = ((BigDecimal) result.get("TOTAL_COUNT")).intValue();
        int successCount = ((BigDecimal) result.get("SUCCESS_COUNT")).intValue();
        int failureCount = totalCount - successCount;
        Map<String, Integer> stats = new HashMap<>();
        stats.put("total", totalCount);
        stats.put("success", (successCount * 100) / totalCount);
        stats.put("failure", (failureCount * 100) / totalCount);
        return stats;
    }

    @DeleteMapping("/procedures/{name}")
    public ResponseEntity<ProcedureResponse> deleteProcedure(@PathVariable String name) {
        String sqlSelect = "SELECT * FROM procedures WHERE name = ?";
        String sqlDelete = "DELETE FROM procedures WHERE name = ?";
        try (Connection conn = jdbcTemplate.getDataSource().getConnection();
             PreparedStatement psSelect = conn.prepareStatement(sqlSelect);
             PreparedStatement psDelete = conn.prepareStatement(sqlDelete)) {
            // Select the row from the programs table
            psSelect.setString(1, name);
            ResultSet rs = psSelect.executeQuery();
            // Delete the row from the programs table
            psDelete.setString(1, name);
            int rowsAffected = psDelete.executeUpdate();
            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ProcedureResponse("An error occurred while deleting the procedures " + name));
            }
            // Delete the procedure from the database
            String sqlDrop = "DROP PROCEDURE " + name;
            jdbcTemplate.execute(sqlDrop);
            return ResponseEntity.ok(new ProcedureResponse("Procedure " + name + " deleted successfully"));
        } catch (SQLException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ProcedureResponse("An error occurred while deleting the procedure " + name + ": " + ex.getMessage()));
        }
    }
     		
}
