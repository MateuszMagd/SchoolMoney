package com.schoolmoney.app.dto;

import lombok.Data;

@Data
public class ClassQueueDto {
    private String sessionId;
    private String childFullName;
    private String childSessionId;
    private String classesName;
    private String classesSessionId;
}
