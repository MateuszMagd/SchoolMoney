package com.schoolmoney.app.controller;

import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.service.BillsService;
import com.schoolmoney.app.service.interfaces.IBillsService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.UniqueNumberGenerator;
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
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        try {
            User newUser = UserDtoToUser(userDto);
            if(newUser == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User couldn't be saved.");
            }

            Bills newUserBills = new Bills(UniqueNumberGenerator.getUniqueNumber());

            if(billsService.saveBills(newUserBills) == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Bills creation problem.");
            }
            newUser.setBills(newUserBills);

            userService.addUser(newUser);

            return ResponseEntity.ok("User registered.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong. . .");
        }
    }
}