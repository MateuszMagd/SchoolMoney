package com.schoolmoney.app.controller;

import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.dto.UserInfoDto;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.service.interfaces.IChildService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.converters.ChildToChildDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserInfoDtoConverter;
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

    @GetMapping
    public ResponseEntity<?> getUserByEmail(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Didn't find user with this email");
            }
            UserInfoDto userDto = UserToUserInfoDtoConverter.UserToUserDto(user);

            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Didn't find user with this email");
            }
            if(user.getUserType() != UserType.ADMIN) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            List<User> allUsers = userService.getAllUsers();

            List<UserInfoDto> usersDto = UserToUserInfoDtoConverter.ConvertListToDto(allUsers);

            return ResponseEntity.ok(usersDto);
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
            List<ChildDto> childDtos = ChildToChildDtoConverter.ConvertListToDto(children);

            return ResponseEntity.ok(Objects.requireNonNullElse(childDtos, "No children found"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/child/{sessionId}")
    public ResponseEntity<?> getChildBySessionId(@PathVariable String sessionId, @RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            Child child = childService.getChildBySessionId(sessionId);
            if(child == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No child found");
            }

            ChildDto childDto = ChildToChildDtoConverter.ChildToChildDto(child);

            return  ResponseEntity.ok(childDto);

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/child/edit")
    public ResponseEntity<?> editChild(@RequestHeader("Authorization") String token, @RequestBody ChildDto childDto) {
        try{
            Claims claims = JwtTokenUtil.verifyToken(token);
            Child child = childService.getChildBySessionId(childDto.getSessionId());
            if(child == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No child found");
            }

            child.setBirthday(childDto.getBirthday());
            child.setName(childDto.getFirstName());
            child.setLastName(childDto.getLastName());
            child.setPesel(childDto.getPesel());
            child.setPhoto(childDto.getPhoto());

            childService.saveChild(child);
            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

}
