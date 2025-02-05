package com.schoolmoney.app;

import com.schoolmoney.app.entities.*;
import com.schoolmoney.app.entities.Class;
import com.schoolmoney.app.enums.OperationType;
import com.schoolmoney.app.enums.StatusType;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.repository.*;
import com.schoolmoney.app.service.ChildService;
import com.schoolmoney.app.service.PDFService;
import com.schoolmoney.app.service.UserService;
import com.schoolmoney.app.utils.PasswordHash;
import com.schoolmoney.app.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Component
public class RunAtStart {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final BillsHistoryRepository billsHistoryRepository;
    private final FundRepository fundRepository;
    private final BillsRepository billsRepository;
    @Autowired
    public RunAtStart(BillsRepository billsRepository, FundRepository fundRepository, UserRepository userRepository, ChildRepository childRepository, BillsHistoryRepository billsHistoryRepository) {
        super();

        //
        // ! BELOW CONNECT REPOSITORIES/SERVICIES !
        //
        this.billsRepository = billsRepository;
        this.fundRepository = fundRepository;
        this.userRepository = userRepository;
        this.childRepository = childRepository;
        this.billsHistoryRepository = billsHistoryRepository;
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

            Bills bills = new Bills();
            parent1.setBills(bills);
            BillsHistory billsHistory = new BillsHistory(bills, bills, 5f, OperationType.TEST, "za godność", LocalDate.parse("2024-01-25"));
            billsRepository.save(bills);
            billsHistoryRepository.save(billsHistory);

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
                    "11211311400",Utils.loadPhoto("default.png") , null, List.of(parent1, parent2));

            childRepository.save(child1);
            childRepository.save(child2);
//            Class clas = new Class();

            // <---------------- fundusz --------------------->
            Fund fund = new Fund("Zbiórka na dupe", "asd", 5, 0, 15,Utils.loadPhoto("default.png"), LocalDate.parse("2024-01-25"), LocalDate.parse("2024-01-27"), StatusType.CLOSED,null , bills, parent1);
            fundRepository.save(fund);
            fund.setSessionId(fundRepository.findFundById(fund.getId()).getSessionId());
            // <---------------- ADMIN -------------------->
            System.out.println("[Starting] All done! Get started!");

//            System.out.println("po sesid: " + billsHistoryRepository.findBillsHistoryBySessionId(fund.getSessionId()).size());
//            System.out.println("po id: " + billsHistoryRepository.findBillsHistoryByFundId(fund.getId()).size());
//            System.out.println("wynik: " + UUID.fromString(billsHistoryRepository.findBillsHistoryByFundId(fund.getId()).getFirst().getSessionId()) + "    " + UUID.fromString(fund.getSessionId()));
            PDFService pdfService = new PDFService(fundRepository, userRepository, billsHistoryRepository);
            pdfService.generatePdf(fund);
        };
    }
}
