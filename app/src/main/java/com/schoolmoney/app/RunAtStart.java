package com.schoolmoney.app;

import com.schoolmoney.app.entities.*;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.enums.OperationType;
import com.schoolmoney.app.enums.StatusType;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.repository.*;
import com.schoolmoney.app.service.ChildService;
import com.schoolmoney.app.service.ClassService;
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
    private final ClassRepository classRepository;
    @Autowired
    public RunAtStart(BillsRepository billsRepository, FundRepository fundRepository, UserRepository userRepository, ChildRepository childRepository, BillsHistoryRepository billsHistoryRepository, ClassRepository classRepository) {
        super();

        //
        // ! BELOW CONNECT REPOSITORIES/SERVICIES !
        //
        this.billsRepository = billsRepository;
        this.fundRepository = fundRepository;
        this.userRepository = userRepository;
        this.childRepository = childRepository;
        this.billsHistoryRepository = billsHistoryRepository;
        this.classRepository = classRepository;
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
            bills.setBalance(100);

            Bills bills2 = new Bills();
            parent2.setBills(bills2);

            Bills bills3 = new Bills();
            parent3.setBills(bills3);

            billsRepository.save(bills);
            billsRepository.save(bills2);
            billsRepository.save(bills3);

            userRepository.save(parent1);
            userRepository.save(parent2);
            userRepository.save(parent3);

            User admin = new User("admin@gmail.com", PasswordHash.hashPasswordWithSalt("test", salt), salt,
                                    "000000000", "Admin", "Admin", Utils.loadPhoto("default.png"), null);
            admin.setUserType(UserType.ADMIN);

            userRepository.save(admin);
            // <---------------- KIDS --------------------->
            System.out.println("[Starting] Adding new classes...");
            Classes classes = new Classes("Wolves", parent1);

            classRepository.save(classes);

            Bills bills4 = new Bills();
            Bills bills5 = new Bills();
            billsRepository.save(bills4);
            billsRepository.save(bills5);

            Bills bills6 = new Bills();
            billsRepository.save(bills6);

            System.out.println("[Starting] Adding test kids. . .");
            Child child1 = new Child("Mateusz", "Kristin", LocalDate.of(2017, 2, 10),
                                    "11211311400", Utils.loadPhoto("default.png"), classes, List.of(parent1, parent2), bills4);

            Child child2 = new Child("Anna", "Kristin", LocalDate.of(2017, 2, 10),
                    "11211311400",Utils.loadPhoto("default.png") , classes, List.of(parent1, parent2), bills5);

            Child child3 = new Child("Miłosz", "Kristin", LocalDate.of(2017, 2, 10),
                    "00022233344",Utils.loadPhoto("default.png") , null, List.of(parent1, parent2), bills6);



            childRepository.save(child1);
            childRepository.save(child2);
            childRepository.save(child3);


            // <---------------- fundusz --------------------->
            Bills billsFund = new Bills();
            billsRepository.save(billsFund);

            Fund fund = new Fund("Zbiórka na wycieczke", "Wycieczka do częstochowy", 10, 0, 10,Utils.loadPhoto("default.png"), LocalDate.parse("2024-01-25"), LocalDate.parse("2024-01-27"), StatusType.OPEN, classes , billsFund, parent1);
            fundRepository.save(fund);

            BillsHistory billsHistory = new BillsHistory(bills, billsFund, bills4, 10, OperationType.TRANSFER, "Zapłacono za wycieczke za Mateusz Kristian", LocalDate.parse("2024-01-25"));
            billsHistoryRepository.save(billsHistory);

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
