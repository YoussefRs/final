package com.khaoula.plsql.models;

import javax.persistence.*;

@Entity
@Table(name = "proc_log")
public class Proc_log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String status;

    @Column(length = 1000)
    private String error;

    @Column(length = 1000)
    private String body;

    public Proc_log() {}

    public Proc_log(String name, String status, String error, String body) {
        this.name = name;
        this.status = status;
        this.error = error;
        this.body = body;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}