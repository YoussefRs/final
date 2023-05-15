package com.khaoula.plsql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khaoula.plsql.models.AdminNotification;

public interface AdminNotificationRepository extends JpaRepository<AdminNotification, Long> {
    
    // Method to save a new notification
    AdminNotification save(AdminNotification notification);

    // Method to retrieve all notifications
    List<AdminNotification> findAll();
}