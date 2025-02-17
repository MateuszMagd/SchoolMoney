package com.schoolmoney.app.entities;

import jakarta.persistence.*;

import java.security.SecureRandom;
import java.util.UUID;

@Entity
public class Bills {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(unique = true)
    private String sessionId;
    @Column(unique = true)
    private String billsNumber;

    public Bills() {
        this.sessionId = UUID.randomUUID().toString();
        this.billsNumber = generateBillsNumber();
    }

    private String generateBillsNumber() {
        SecureRandom random = new SecureRandom();
        StringBuilder number = new StringBuilder();

        for (int i = 0; i < 27; i++) {
            number.append(random.nextInt(10));
        }
        return number.toString();
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

    public long getId() {
        return id;
    }
}
