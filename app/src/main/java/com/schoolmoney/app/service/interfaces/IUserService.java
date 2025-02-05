package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.User;

import java.util.List;

public interface IUserService {
    void addUser(User user);

    User modifyUser(User user);

    void deleteUser(User user);

    User getUserByEmail(String email);
    List<User> getAllUsers();

    User getUserBySenderId(String senderId);

}
