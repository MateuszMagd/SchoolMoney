package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.ClassQueue;
import com.schoolmoney.app.entities.Classes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassQueueRepository extends JpaRepository<ClassQueue, Long> {
    List<ClassQueue> findByClasses(Classes classes);
    ClassQueue findBySessionId(String sessionId);
}
