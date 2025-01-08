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
import com.schoolmoney.app.utils.PasswordHash;
import com.schoolmoney.app.utils.converters.ChildToChildDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserInfoDtoConverter;
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
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            List<Child> child = childService.getAllChildren();
            if(child == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
            }

            List<ChildDto> userDtos = ChildToChildDtoConverter.ConvertListToDto( child);

            return ResponseEntity.ok(userDtos);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@RequestHeader("Authorization") String token, @PathVariable String email) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
            User user = userService.getUserByEmail(email);
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Didn't find user with this email");
            }
            UserInfoDto userDto = UserToUserInfoDtoConverter.UserToUserDto(user);

            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/user/modify/{email}")
    public ResponseEntity<?> modifyUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto, @PathVariable String email) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access - You are not admin");
            }

            User user = userService.getUserByEmail(email);
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
            }

            user.setUserType(userDto.getUserType());
            user.setEmail(userDto.getEmail());
            user.setPesel(userDto.getPesel());
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());

            user.setPhoto(userDto.getPhoto());

            // TODO: Change it when it should be changed
            String salt = PasswordHash.generateSalt();
            user.setPassword(PasswordHash.hashPasswordWithSalt(userDto.getPassword(), salt));
            user.setSalt(salt);

            userService.modifyUser(user);
            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @DeleteMapping("/user/delete/{email}")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String token, @PathVariable String email) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
            User user = userService.getUserByEmail(email);
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
            }

            userService.deleteUser(user);


            return ResponseEntity.ok("Ok - User has been deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/user/add")
    public ResponseEntity<?> addUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            User user = new User();
            user.setUserType(userDto.getUserType());
            user.setEmail(userDto.getEmail());
            user.setPesel(userDto.getPesel());
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setPhoto(userDto.getPhoto());

            String salt = PasswordHash.generateSalt();
            user.setPassword(PasswordHash.hashPasswordWithSalt(userDto.getPassword(), salt));
            user.setSalt(salt);

            userService.addUser(user);

            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
}
