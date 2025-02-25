package com.schoolmoney.app.dto;

import com.schoolmoney.app.enums.ChildFundStatusType;
import com.schoolmoney.app.enums.StatusType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class FundInfoDto {
    private ChildDto childDto;
    private String fundSessionId;
    private String name;
    private float money;
    private StatusType statusType;
    private ChildFundStatusType status;
    private String classSessionId;
    private LocalDate startDate;
    private LocalDate endDate;
}
