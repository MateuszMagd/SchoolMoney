package com.schoolmoney.app.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;
    private String className;
    private boolean isActive;
    @ManyToOne
    private User patron;

    public Classes(String className, User patron) {
        this.sessionId = UUID.randomUUID().toString();
        this.className = className;
        this.isActive = true;
        this.patron = patron;
    }

    public Long getId() {
        return id;
    }

    public Classes() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public User getPatron() {
        return patron;
    }

    public void setPatron(User patron) {
        this.patron = patron;
    }
}
