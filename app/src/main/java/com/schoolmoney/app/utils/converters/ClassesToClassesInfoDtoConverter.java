package com.schoolmoney.app.utils.converters;

import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.ClassInfoDto;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.Classes;

import java.util.List;
import java.util.stream.Collectors;

public class ClassesToClassesInfoDtoConverter {
    public static ClassInfoDto ClassesToClassesInfoDto(Classes classes) {
        ClassInfoDto dto = new ClassInfoDto();

        dto.setClassName(classes.getClassName());
        dto.setSessionId(classes.getSessionId());


        return dto;
    }

    public static List<ClassInfoDto> ConvertListToDto(List<Classes> children) {
        return children.stream().map(ClassesToClassesInfoDtoConverter::ClassesToClassesInfoDto).collect(Collectors.toList());
    }
}
