package com.khaoula.plsql.requests;

import java.util.*;

public class ProcedureResponse {
    private String message;
    private List<Map<String, Object>> errors;
    private String name;
    private String body;
    private Integer id;

    public ProcedureResponse(String message) {
        this.message = message;
    }

    public ProcedureResponse(List<Map<String, Object>> errors) {
        this.errors = errors;
    }

    public ProcedureResponse(Integer id ,String name, String body) {
        this.name = name;
        this.body = body;
        this.id = id;
    }
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<Map<String, Object>> getErrors() {
        return errors;
    }

    public void setErrors(List<Map<String, Object>> errors) {
        this.errors = errors;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
    
    
}