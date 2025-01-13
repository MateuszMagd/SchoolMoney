package com.schoolmoney.app.utils.converters;

import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.utils.PasswordHash;

import java.security.NoSuchAlgorithmException;

public class UserDtoToUserConverter {
    public static User UserDtoToUser(UserDto userDto) throws NoSuchAlgorithmException {
        User newUser = new User();

        String salt = PasswordHash.generateSalt();
        newUser.setSalt(salt);
        try {
            newUser.setPassword(PasswordHash.hashPasswordWithSalt(userDto.getPassword(), salt));
        }
        catch (Exception e) {
            return null;
        }

        newUser.setEmail(userDto.getEmail());
        newUser.setPesel(userDto.getPesel());
        newUser.setPhoto(userDto.getPhoto());

        return newUser;
    }
}
