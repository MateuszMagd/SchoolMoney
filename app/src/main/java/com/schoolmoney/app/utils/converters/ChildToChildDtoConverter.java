package com.schoolmoney.app.utils.converters;

import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class ChildToChildDtoConverter {
    public static ChildDto ChildToChildDto(Child children) {
        ChildDto dto = new ChildDto();

        dto.setPhoto(children.getPhoto());
        dto.setFirstName(children.getName());
        dto.setLastName(children.getLastName());
        dto.setBirthday(children.getBirthday());
        dto.setPesel(children.getPesel());
        dto.setSessionId(children.getSessionId());

        return dto;
    }

    public static List<ChildDto> ConvertListToDto(List<Child> children) {
        return children.stream().map(ChildToChildDtoConverter::ChildToChildDto).collect(Collectors.toList());
    }
}
