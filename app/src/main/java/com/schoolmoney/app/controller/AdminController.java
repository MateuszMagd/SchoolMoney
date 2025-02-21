package com.schoolmoney.app.controller;

import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.NewChildRegister;
import com.schoolmoney.app.dto.UserDto;
import com.schoolmoney.app.dto.UserInfoDto;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.service.interfaces.IChildService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.PasswordHash;
import com.schoolmoney.app.utils.Utils;
import com.schoolmoney.app.utils.converters.ChildToChildDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserInfoDtoConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
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

    @PostMapping("/children/delete/{sessionId}")
    public ResponseEntity<?> deleteChildBySessionId(@RequestHeader("Authorization") String token, @PathVariable String sessionId) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
            Child child = childService.getChildBySessionId(sessionId);
            if(child == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Didn't find child with this session Id");
            }
            childService.deleteChild(child);

            return ResponseEntity.ok("Ok - User has been deleted");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/children/add/new")
    public ResponseEntity<?> addNewChild(@RequestHeader("Authorization") String token, @RequestBody NewChildRegister newChildRegister) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
            if(newChildRegister.getFirstName() == null || newChildRegister.getLastName() == null || newChildRegister.getBirthday() == null || newChildRegister.getPesel() == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Not all fields are complited!");
            }

            Child child = new Child();
            child.setName(newChildRegister.getFirstName());
            child.setLastName(newChildRegister.getLastName());
            child.setPesel(newChildRegister.getPesel());
            child.setBirthday(newChildRegister.getBirthday());
            child.setPhoto(Utils.loadPhoto("default.png"));

            childService.saveChild(child);

            return ResponseEntity.ok("Ok");
        } catch (IOException e) {
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
            if(user.getUserType() != UserType.ADMIN || user.getUserType() != UserType.PARENT)
                user.setUserType(userDto.getUserType());
            if(userDto.getEmail() != null)
                user.setEmail(userDto.getEmail());
            if(userDto.getPesel() != null)
                user.setPesel(userDto.getPesel());
            if(userDto.getFirstName() != null)
                user.setFirstName(userDto.getFirstName());
            if(userDto.getLastName() != null)
                user.setLastName(userDto.getLastName());
            if(userDto.getPhoto() != null)
                user.setPhoto(userDto.getPhoto());

            if(userDto.getPassword() != null)
            {
                if(!user.getPassword().equals(userDto.getPassword()))
                {
                    String salt = PasswordHash.generateSalt();
                    user.setPassword(PasswordHash.hashPasswordWithSalt(userDto.getPassword(), salt));
                    user.setSalt(salt);
                }
            }
            userService.modifyUser(user);
            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/user/delete/{email}")
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

            // This could be a better but welp
            if(user.getUserType() == UserType.ADMIN) {
                List<User> users = userService.getAllUsers();
                int admin_number = 0;
                for(User userr: users) {
                    if(userr.getUserType() == UserType.ADMIN)
                        admin_number += 1;
                }

                if(admin_number <= 1)
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("There is only one admin");
            }

            List<Child> children = childService.getChildrenByParentEmail(email);
            for(Child child: children) {
                List<User> parents = child.getParents();
                parents.remove(user);
                child.setParents(parents);

                childService.saveChild(child);
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
