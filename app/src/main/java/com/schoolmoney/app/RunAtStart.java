package com.schoolmoney.app;

import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.repository.ChildRepository;
import com.schoolmoney.app.repository.UserRepository;
import com.schoolmoney.app.service.ChildService;
import com.schoolmoney.app.service.UserService;
import com.schoolmoney.app.utils.PasswordHash;
import com.schoolmoney.app.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class RunAtStart {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    @Autowired
    public RunAtStart(UserRepository userRepository, ChildRepository childRepository) {
        super();

        //
        // ! BELOW CONNECT REPOSITORIES/SERVICIES !
        //

        this.userRepository = userRepository;
        this.childRepository = childRepository;
    }

    @Autowired
    @Bean
    public CommandLineRunner runner(UserRepository userRepository, ChildRepository childRepository)
    {
        return args -> {
            System.out.println("APPLICATION STARTED!");
            // <---------------- USERS -------------------->
            System.out.println("[Starting] Adding test users. . .");
            String salt = PasswordHash.generateSalt();

            User parent1 = new User("example@gmail.com", PasswordHash.hashPasswordWithSalt("test", salt), salt,
                                    "11122233399", "John","Kristin", Utils.loadPhoto("default.png"), null);

            User parent2 = new User("example.parent2@gmail.com", PasswordHash.hashPasswordWithSalt("test2", salt), salt,
                                    "99988877711","Anna","Kristin", Utils.loadPhoto("default.png"), null);

            User parent3 = new User("example.parent3@gmail.com", PasswordHash.hashPasswordWithSalt("test3", salt), salt,
                                    "55566677728","Mateusz","Mag", Utils.loadPhoto("default.png"), null);

            userRepository.save(parent1);
            userRepository.save(parent2);
            userRepository.save(parent3);

            User admin = new User("admin@gmail.com", PasswordHash.hashPasswordWithSalt("test", salt), salt,
                                    "000000000", "Admin", "Admin", Utils.loadPhoto("default.png"), null);
            admin.setUserType(UserType.ADMIN);

            userRepository.save(admin);
            // <---------------- KIDS --------------------->
            System.out.println("[Starting] Adding test kids. . .");
            Child child1 = new Child("Mateusz", "Kristin", LocalDate.of(2017, 2, 10),
                                    "11211311400", Utils.loadPhoto("default.png"), null, List.of(parent1, parent2));

            Child child2 = new Child("Anna", "Kristin", LocalDate.of(2017, 2, 10),
                    "11211311400", Utils.loadPhoto("default.png"), null, List.of(parent1, parent2));

            childRepository.save(child1);
            childRepository.save(child2);

            // <---------------- ADMIN -------------------->
            System.out.println("[Starting] All done! Get started!");
        };
    }
}
