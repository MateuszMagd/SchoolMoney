package com.schoolmoney.app.dto;

import com.schoolmoney.app.enums.UserType;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class UserInfoDto {
    private String email;
    private String firstName;
    private String lastName;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo;
    private String pesel;
    private UserType userRole;
}
