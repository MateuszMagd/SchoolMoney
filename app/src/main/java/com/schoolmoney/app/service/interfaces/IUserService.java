package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.User;

import java.util.List;

public interface IUserService {
    int addUser(User user);
    List<User> getAllUsers();

}
