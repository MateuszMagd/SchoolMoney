package com.schoolmoney.app.controller;

import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.service.interfaces.IChildService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.converters.ChildToChildDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserDtoConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final IUserService userService;
    private final IChildService childService;

    @Autowired
    public AdminController(IUserService userService, IChildService childService) {
        this.userService = userService;
        this.childService = childService;
    }

    @GetMapping("/users/all")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            List<User> users = userService.getAllUsers();

            if(users == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
            }

            List<UserDto> userDtos = UserToUserDtoConverter.ConvertListToDto(users);

            return ResponseEntity.ok(userDtos);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/children/all")
    public ResponseEntity<?> getAllChildren(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            System.out.println(claims.get("typ", String.class));
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                System.out.println("TYP ZLY LOL");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            List<Child> child = childService.getAllChildren();
            if(child == null) {
                System.out.println("CHILD NULL");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
            }

            List<ChildDto> userDtos = ChildToChildDtoConverter.ConvertListToDto( child);

            return ResponseEntity.ok(userDtos);
        }
        catch (Exception e) {
            System.out.println("EXCEPTION");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/user/modify")
    public ResponseEntity<?> modifyUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) {
        try {
            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/user/delete")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) {
        try {
            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/user/add")
    public ResponseEntity<?> addUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) {
        try {
            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
}
