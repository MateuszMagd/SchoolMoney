package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.User;

import java.util.List;

public interface IUserService {
    User addUser(User user);
    User getUserByEmail(String email);
    List<User> getAllUsers();

}
