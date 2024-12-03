package com.schoolmoney.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Child {
    @Id
    private Long id;
    private String sessionId;
    private String name;
    private String lastName;
    private String email;
    private LocalDate birthday;
    private String pesel;
    private byte[] photo;

    // Will be when class done
    // private Class class

    @ManyToMany
    private List<User> parents;
}
