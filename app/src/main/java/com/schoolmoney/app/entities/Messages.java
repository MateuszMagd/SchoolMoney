package com.schoolmoney.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.sql.Date;
import java.time.LocalDate;

@Entity
public class Messages {
    @Id
    private Long id;

    private String messagesSessionId;
    private String text;

    @ManyToOne
    private User author;
    @ManyToOne
    private User reciverParent;
    @ManyToOne
    private ClassMessages reciverClass;

    private LocalDate date;

}
