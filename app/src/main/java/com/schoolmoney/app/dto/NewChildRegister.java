package com.schoolmoney.app.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NewChildRegister {
    private String firstName;
    private String lastName;
    private LocalDate birthday;
    private String pesel;
}
