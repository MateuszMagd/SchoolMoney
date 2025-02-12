package com.schoolmoney.app.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class ClassMessages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;

    @ManyToOne
    private Classes classId;

    public ClassMessages(Classes classId) {
        this.sessionId = UUID.randomUUID().toString();
        this.classId = classId;
    }

    public ClassMessages() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public Classes getClassId() {
        return classId;
    }

    public void setClassId(Classes classid) {
        this.classId = classid;
    }
}
