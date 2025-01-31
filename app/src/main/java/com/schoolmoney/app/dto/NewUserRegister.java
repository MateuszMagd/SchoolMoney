package com.schoolmoney.app.dto;

import lombok.Data;

@Data
public class NewUserRegister {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
}
