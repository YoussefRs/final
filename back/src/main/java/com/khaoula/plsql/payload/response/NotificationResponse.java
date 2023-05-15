package com.khaoula.plsql.payload.response;


//for admin
import java.util.Date;

public class NotificationResponse {
    private Long id;
    private String text;
    private Date createdAt;
    
    public NotificationResponse(Long id, String text, Date createdAt) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
