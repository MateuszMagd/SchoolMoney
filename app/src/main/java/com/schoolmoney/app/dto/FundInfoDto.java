package com.schoolmoney.app.dto;

import com.schoolmoney.app.enums.ChildFundStatusType;
import lombok.Data;

@Data
public class FundInfoDto {
    private ChildDto childDto;
    private String fundSessionId;
    private String name;
    private float money;
    private ChildFundStatusType status;
}
