package com.schoolmoney.app.authenticate;

import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.repository.UserRepository;
import com.schoolmoney.app.utils.PasswordHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String authenticate(String email, String password) throws Exception {
        User user = userRepository.getUserByEmail(email);

        // Check if user exists in database
        if(user == null)
            throw new Exception("Invalid email or password.");

        // Check if password is correct.
        if(!PasswordHash.verifyPassword(user.getPassword(), user.getSalt(), password))
            throw new Exception("Invalid email or password.");

        return JwtTokenUtil.generateToken(user.getEmail(), user.getUserType());
    }
}
