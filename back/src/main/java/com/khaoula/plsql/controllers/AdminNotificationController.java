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

import com.khaoula.plsql.models.AdminNotification;
import com.khaoula.plsql.payload.response.NotificationResponse;
import com.khaoula.plsql.repository.AdminNotificationRepository;
import com.khaoula.plsql.requests.ProcedureResponse;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/programs")
public class AdminNotificationController {
    private final AdminNotificationRepository repository;

    public AdminNotificationController(AdminNotificationRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/notifications")
    public ResponseEntity<AdminNotification> createNotification(@RequestBody AdminNotification notification) {
        AdminNotification savedNotification = repository.save(notification);
        return ResponseEntity.ok(savedNotification);
    }

    @GetMapping("/allNotifications")
    public List<NotificationResponse> getAllNotifications() {
        List<AdminNotification> notifications = repository.findAll();
        List<NotificationResponse> responseList = new ArrayList<>();
        for (AdminNotification notification : notifications) {
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
