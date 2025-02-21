package com.schoolmoney.app.controller;

import com.schoolmoney.app.dto.NewUserRegister;
import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.service.BillsService;
import com.schoolmoney.app.service.interfaces.IBillsService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.PasswordHash;
import com.schoolmoney.app.utils.UniqueNumberGenerator;
import com.schoolmoney.app.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.schoolmoney.app.utils.converters.UserDtoToUserConverter.UserDtoToUser;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
    private final IUserService userService;
    private final IBillsService billsService;

    @Autowired
    public RegisterController( IUserService userService, IBillsService billsService) {
        this.userService = userService;
        this.billsService = billsService;
    }

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@RequestBody NewUserRegister newUser) {
        try {
            if(newUser.getFirstName() == null || newUser.getLastName() == null || newUser.getPassword() == null || newUser.getEmail() == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User couldn't be saved.");
            }

            User user = new User();
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setEmail(newUser.getEmail());

            String salt = PasswordHash.generateSalt();
            user.setSalt(salt);
            user.setPassword(PasswordHash.hashPasswordWithSalt(newUser.getPassword(), salt));

            Bills newUserBills = new Bills();
            if(billsService.saveBills(newUserBills) == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Bills creation problem.");
            }
            user.setBills(newUserBills);

            user.setPesel("00000000000");
            user.setUserType(UserType.PARENT);
            user.setPhoto(Utils.loadPhoto("default.png"));

            userService.addUser(user);

            return ResponseEntity.ok("User registered.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong. . .");
        }
    }
}