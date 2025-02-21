package com.schoolmoney.app.dto;

import com.schoolmoney.app.enums.OperationType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BillsHistoryDto {
    private String receiverFullName;
    private float amountSended;
    private OperationType operationType;
    private String text;
    private LocalDate date;
}
