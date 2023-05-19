package com.khaoula.plsql.controllers;

import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khaoula.plsql.models.Notification;
import com.khaoula.plsql.payload.response.NotificationResponse;
import com.khaoula.plsql.repository.NotificationRepository;
import com.khaoula.plsql.requests.ProcedureResponse;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/programs")
public class NotificationControl {
    private final NotificationRepository repository;

    public NotificationControl(NotificationRepository repository) {
        this.repository = repository;
    }
    
    // Report controller (user interface)
    @PostMapping("/notifications")
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification savedNotification = repository.save(notification);
        return ResponseEntity.ok(savedNotification);
    }
    
    // Get all the notifications in notification box (Admin interface)
    @GetMapping("/allNotifications")
    public List<NotificationResponse> getAllNotifications() {
        List<Notification> notifications = repository.findAll();
        List<NotificationResponse> responseList = new ArrayList<>();
        for (Notification notification : notifications) {
            NotificationResponse response = new NotificationResponse(
                notification.getId(),
                notification.getNotification(),
                new Date()
            );
            responseList.add(response);
        }
        return responseList;
    }
}
