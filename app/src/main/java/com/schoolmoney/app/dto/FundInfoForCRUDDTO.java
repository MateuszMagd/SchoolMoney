package com.schoolmoney.app.dto;

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
}
