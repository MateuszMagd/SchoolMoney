package com.schoolmoney.app.utils.converters;

import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserToUserDtoConverter {
    public static UserDto UserToUserDto(User user) {
        UserDto dto = new UserDto();

        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhoto(user.getPhoto());
        dto.setPesel(user.getPesel());
        dto.setPassword(user.getPassword());
        dto.setUserType(user.getUserType());

        return dto;
    }

    public static List<UserDto> ConvertListToDto(List<User> users) {
        return users.stream().map(UserToUserDtoConverter::UserToUserDto).collect(Collectors.toList());
    }
}
