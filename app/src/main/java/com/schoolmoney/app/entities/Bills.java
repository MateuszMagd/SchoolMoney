package com.schoolmoney.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class Bills {
    @Id
    private long id;
    @Column(unique = true)
    private String sessionId;
    @Column(unique = true)
    private String billsNumber;

    public Bills(String billsNumber) {
        this.sessionId = UUID.randomUUID().toString();
        this.billsNumber = billsNumber;
    }

    public Bills() {
        this.sessionId = UUID.randomUUID().toString();
    }


    public String getSessionId() {
        return sessionId;
    }

    public String getBillsNumber() {
        return billsNumber;
    }

    public void setBillsNumber(String billsNumber) {
        this.billsNumber = billsNumber;
    }
}
