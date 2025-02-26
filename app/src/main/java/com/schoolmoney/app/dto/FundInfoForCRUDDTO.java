package com.schoolmoney.app.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class FundInfoForCRUDDTO {
    private String name;
    private String startDate;
    private String endDate;
    private float goal;
    private String description;
    private String classSessionId;
    private String sessionId;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo;
}
