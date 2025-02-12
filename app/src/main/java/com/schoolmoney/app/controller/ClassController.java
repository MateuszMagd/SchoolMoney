package com.schoolmoney.app.controller;


import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.ClassInfoDto;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.service.interfaces.IChildService;
import com.schoolmoney.app.service.interfaces.IClassService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.converters.ChildToChildDtoConverter;
import com.schoolmoney.app.utils.converters.ClassesToClassesInfoDtoConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/class")
public class ClassController {
    private final IClassService classService;
    private final IUserService userService;

    private final IChildService childService;

    @Autowired
    public ClassController(IClassService classService, IUserService userService, IChildService childService) {
        this.classService = classService;
        this.userService = userService;
        this.childService = childService;
    }


    @GetMapping("/get/all")
    public ResponseEntity<?> getAllClasses(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            if(!claims.get("typ", String.class).equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            List<Classes> classesList = classService.getAllClasses();

            return ResponseEntity.ok(classesList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/get/user/all")
    public ResponseEntity<?> getAllUserClasses(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User was not found.");
            }

            List<Classes> classesList = classService.getClassesByPatron(user);
            List<ClassInfoDto> classesInfo = ClassesToClassesInfoDtoConverter.ConvertListToDto(classesList);

            return ResponseEntity.ok(classesInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/add/new")
    public ResponseEntity<?> addNewClass(@RequestHeader("Authorization") String token, @RequestBody String className) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User was not found.");
            }

            Classes classes = new Classes();
            classes.setClassName(className);
            classes.setActive(true);
            classes.setPatron(user);

            classService.addNewClass(classes);
            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/get/children")
    public ResponseEntity<?> getAllChildrenFromClass(@RequestHeader("Authorization") String token, @RequestHeader("SessionId") String sessionId) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            Classes classes = classService.getClassBySessionId(sessionId);
            if(classes == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No class found");
            }

            List<Child> children = classService.getAllChildrenFromClass(classes);
            if(children == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No children found");
            }

            List<ChildDto> childrenDto = ChildToChildDtoConverter.ConvertListToDto(children);

            return ResponseEntity.ok(childrenDto);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/get/all/possible")
    public ResponseEntity<?> getAllPossibleClassesForUser(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No user found");
            }

            List<Classes> classes  = classService.getClassesByPatron(user);

            List<Child> children = childService.getChildrenByParentEmail(user.getEmail());
            if(children != null) {
                for(Child child: children) {
                    Classes childClass = child.getClassId();

                    if(!classes.contains(childClass)) {
                        classes.add(childClass);
                    }
                }
            }

            return ResponseEntity.ok(classes);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
}
