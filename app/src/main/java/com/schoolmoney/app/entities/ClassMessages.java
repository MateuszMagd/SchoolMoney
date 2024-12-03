package com.schoolmoney.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ClassMessages {
    @Id
    private Long id;
    private String classSessionId;

    // Class id here when class done
    // private Class class
}
