package com.schoolmoney.app.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;
    private String text;
    @ManyToOne
    private User author;
    @ManyToOne
    private User receiverParent;
    @ManyToOne
    private ClassMessages receiverClass;
    private LocalDate date;

    public Messages(String text, User author, User receiverParent, ClassMessages receiverClass, LocalDate date) {
        this.sessionId = UUID.randomUUID().toString();
        this.text = text;
        this.author = author;
        this.receiverParent = receiverParent;
        this.receiverClass = receiverClass;
        this.date = date;
    }

    public Messages() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public User getReceiverParent() {
        return receiverParent;
    }

    public void setReceiverParent(User receiverParent) {
        this.receiverParent = receiverParent;
    }

    public ClassMessages getReceiverClass() {
        return receiverClass;
    }

    public void setReceiverClass(ClassMessages receiverClass) {
        this.receiverClass = receiverClass;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
