package com.schoolmoney.app;

import com.schoolmoney.app.repository.UserRepository;
import com.schoolmoney.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class RunAtStart {
    private final UserRepository userRepository;
    @Autowired
    public RunAtStart(UserRepository userRepository) {
        super();

        //
        // ! BELOW CONNECT REPOSITORIES/SERVICIES !
        //

        this.userRepository = userRepository;
    }

    @Autowired
    @Bean
    public CommandLineRunner runner(UserRepository userRepository)
    {
        return args -> {
            System.out.println("APPLICATION STARTED!");
        };
    }
}
