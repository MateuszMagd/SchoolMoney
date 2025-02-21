package com.schoolmoney.app.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NewFoundRegister {
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private int goal;
    private String description;
    private String classSessionId;
}
