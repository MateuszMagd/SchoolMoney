package com.schoolmoney.app.dto;

import lombok.Data;

@Data
public class TransactionInfoDto {
    private String name;
    private String sessionId;
    private float amountNeeded;
    private String description;
    private String payForWho;
}
