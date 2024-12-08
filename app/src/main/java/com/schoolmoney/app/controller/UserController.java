package com.schoolmoney.app.controller;

import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.service.interfaces.IChildService;
import com.schoolmoney.app.service.interfaces.IUserService;
import io.jsonwebtoken.Claims;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;
    private final IChildService childService;

    @Autowired
    public UserController(IUserService userService, IChildService childService) {
        this.userService = userService;
        this.childService = childService;
    }
    // TODO: CHANGE SENDING BACK USER TO SENDING BACK DTO!!!!!!!
    @GetMapping
    public ResponseEntity<?> getUserByEmail(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Didn't find user with this email");
            }

            // TODO: SHOULD BE DTO!
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/children")
    public ResponseEntity<?> getAllUserChildren(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
            }

            List<Child> children = childService.getChildrenByParentEmail(user.getEmail());

            // TODO: SHOULD BE DTO!
            return ResponseEntity.ok(Objects.requireNonNullElse(children, "No children found"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        try {
            // TODO: Change verifyToken to verifyAdminToken!
            Claims claims = JwtTokenUtil.verifyToken(token);

            List<User> users = userService.getAllUsers();

            if(users == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
            }

            // TODO: SHOULD BE DTO!
            return ResponseEntity.ok(users);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
}
