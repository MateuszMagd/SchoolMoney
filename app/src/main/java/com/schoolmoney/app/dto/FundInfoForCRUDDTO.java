package com.schoolmoney.app.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
public class FundInfoForCRUDDTO {
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private float goal;
    private String description;
    private String classSessionId;
    private String sessionId;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo;
}
