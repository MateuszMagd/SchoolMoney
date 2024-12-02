package com.schoolmoney.app.service;

import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.repository.UserRepository;
import com.schoolmoney.app.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public int addUser(User user) {
        throw new UnsupportedOperationException("Feature incomplete.");
        //return 0;
    }

    @Override
    public List<User> getAllUsers() {
        throw new UnsupportedOperationException("Feature incomplete.");
        //return null;
    }
}
