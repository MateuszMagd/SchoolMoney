package com.schoolmoney.app.dto;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChildDto {
    private String sessionId;
    private String firstName;
    private String lastName;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo;
    private LocalDate birthday;
    private String pesel;

}
