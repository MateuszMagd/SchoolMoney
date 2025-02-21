package com.schoolmoney.app.entities;

import com.schoolmoney.app.enums.OperationType;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
public class BillsHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;
    @ManyToOne
    @Nonnull
    private Bills sender;
    @ManyToOne
    @Nonnull
    private Bills reciver;
    @ManyToOne
    private Bills subject;
    @Nonnull
    private float amount;
    @Nonnull
    private OperationType operationType;
    @Nonnull
    private String text;
    @Nonnull
    private LocalDate date;

    public BillsHistory(@Nonnull Bills sender, @Nonnull Bills reciver, @Nonnull Bills subject, float amount, @Nonnull OperationType operationType, @Nonnull String text, @Nonnull LocalDate date) {
        this.sessionId = UUID.randomUUID().toString();
        this.sender = sender;
        this.reciver = reciver;
        this.subject = subject;
        this.amount = amount;
        this.operationType = operationType;
        this.text = text;
        this.date = date;
    }

    public BillsHistory() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public Bills getSubject() {
        return subject;
    }

    public void setSubject(Bills subject) {
        this.subject = subject;
    }

    @Nonnull
    public Bills getSender() {
        return sender;
    }

    public void setSender(@Nonnull Bills sender) {
        this.sender = sender;
    }

    @Nonnull
    public Bills getReciver() {
        return reciver;
    }

    public void setReciver(@Nonnull Bills reciver) {
        this.reciver = reciver;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    @Nonnull
    public OperationType getOperationType() {
        return operationType;
    }

    public void setOperationType(@Nonnull OperationType operationType) {
        this.operationType = operationType;
    }

    @Nonnull
    public String getText() {
        return text;
    }

    public void setText(@Nonnull String text) {
        this.text = text;
    }

    @Nonnull
    public LocalDate getDate() {
        return date;
    }

    public void setDate(@Nonnull LocalDate date) {
        this.date = date;
    }
}
