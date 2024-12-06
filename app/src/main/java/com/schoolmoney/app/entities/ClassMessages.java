package com.schoolmoney.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.UUID;

@Entity
public class ClassMessages {
    @Id
    private Long id;
    @Column(unique = true)
    private String sessionId;

    @ManyToOne
    private Class classId;

    public ClassMessages(Class classId) {
        this.sessionId = UUID.randomUUID().toString();
        this.classId = classId;
    }

    public ClassMessages() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public Class getClassId() {
        return classId;
    }

    public void setClassId(Class classid) {
        this.classId = classid;
    }
}
