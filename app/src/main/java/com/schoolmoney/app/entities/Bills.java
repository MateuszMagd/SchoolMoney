package com.schoolmoney.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Bills {
    @Id
    private long id;
}
