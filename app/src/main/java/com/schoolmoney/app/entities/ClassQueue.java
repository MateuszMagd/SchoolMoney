package com.schoolmoney.app.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class ClassQueue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String sessionId;
    @ManyToOne
    private Child child;
    @ManyToOne
    private Classes classes;

    public ClassQueue(Child child, Classes classes) {
        this.child = child;
        this.classes = classes;
        this.sessionId = UUID.randomUUID().toString();
    }

    public ClassQueue() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Child getChild() {
        return child;
    }

    public void setChild(Child child) {
        this.child = child;
    }

    public Classes getClasses() {
        return classes;
    }

    public void setClasses(Classes classes) {
        this.classes = classes;
    }
}
