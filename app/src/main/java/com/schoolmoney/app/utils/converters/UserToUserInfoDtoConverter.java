package com.schoolmoney.app.utils.converters;

import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.dto.UserInfoDto;
import com.schoolmoney.app.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserToUserInfoDtoConverter {
    public static UserInfoDto UserToUserDto(User user) {
        UserInfoDto dto = new UserInfoDto();

        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhoto(user.getPhoto());
        dto.setPesel(user.getPesel());
        dto.setUserRole(user.getUserType());

        return dto;
    }

    public static List<UserInfoDto> ConvertListToDto(List<User> users) {
        return users.stream().map(UserToUserInfoDtoConverter::UserToUserDto).collect(Collectors.toList());
    }
}
