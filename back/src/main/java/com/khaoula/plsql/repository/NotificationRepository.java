package com.khaoula.plsql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khaoula.plsql.models.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    // Method to save a new report
    Notification save(Notification notification);

    // Method to retrieve all notifications
    List<Notification> findAll();
}