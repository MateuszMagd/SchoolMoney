package com.schoolmoney.app.entities;

import com.schoolmoney.app.enums.StatusType;
import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Fund {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;
    private String fundName;
    private String description;
    private float moneyPerKid;
    private float moneyEarned;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo;
    private LocalDate startDate;
    private LocalDate endDate;
    private StatusType status;

    @ManyToOne
    private Class classId;
    @ManyToOne
    private Bills bills;
    @ManyToOne
    private User patron;

    public Fund(String fundName, String description, float moneyPerKid, float moneyEarned, byte[] photo, LocalDate startDate, LocalDate endDate, StatusType status, Class classId, Bills bills, User patron) {
        this.sessionId = UUID.randomUUID().toString();

        this.fundName = fundName;
        this.description = description;
        this.moneyPerKid = moneyPerKid;
        this.moneyEarned = moneyEarned;
        this.photo = photo;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.classId = classId;
        this.bills = bills;
        this.patron = patron;
    }

    public Fund() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getMoneyPerKid() {
        return moneyPerKid;
    }

    public void setMoneyPerKid(float moneyPerKid) {
        this.moneyPerKid = moneyPerKid;
    }

    public float getMoneyEarned() {
        return moneyEarned;
    }

    public void setMoneyEarned(float moneyEarned) {
        this.moneyEarned = moneyEarned;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public StatusType getStatus() {
        return status;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public Class getClassId() {
        return classId;
    }

    public void setClassId(Class classId) {
        this.classId = classId;
    }

    public Bills getBills() {
        return bills;
    }

    public void setBills(Bills bills) {
        this.bills = bills;
    }

    public User getPatron() {
        return patron;
    }

    public void setPatron(User patron) {
        this.patron = patron;
    }
}
