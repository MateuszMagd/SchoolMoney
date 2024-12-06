package com.schoolmoney.app.entities;

import com.schoolmoney.app.enums.OperationType;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.util.UUID;

@Entity
public class BillsHistory {
    @Id
    private Long id;
    @Column(unique = true)
    private String sessionId;
    @ManyToOne
    @Nonnull
    private Bills sender;
    @ManyToOne
    @Nonnull
    private Bills reciver;
    @Nonnull
    private float amount;
    @Nonnull
    private OperationType operationType;
    @Nonnull
    private String text;
    @Nonnull
    private LocalDate date;

    public BillsHistory(@Nonnull Bills sender, @Nonnull Bills reciver, float amount, @Nonnull OperationType operationType, @Nonnull String text, @Nonnull LocalDate date) {
        this.sessionId = UUID.randomUUID().toString();
        this.sender = sender;
        this.reciver = reciver;
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
