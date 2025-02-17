package com.schoolmoney.app.controller;


import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.ChildClassInfoDto;
import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.ClassInfoDto;
import com.schoolmoney.app.dto.ClassQueueDto;
import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.ClassQueue;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.service.interfaces.IChildService;
import com.schoolmoney.app.service.interfaces.IClassQueueService;
import com.schoolmoney.app.service.interfaces.IClassService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.converters.ChildToChildDtoConverter;
import com.schoolmoney.app.utils.converters.ClassesToClassesInfoDtoConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/class")
public class ClassController {
    private final IClassService classService;
    private final IUserService userService;

    private final IChildService childService;
    private final IClassQueueService classQueueService;

    @Autowired
    public ClassController(IClassService classService, IUserService userService, IChildService childService, IClassQueueService classQueueService) {
        this.classService = classService;
        this.userService = userService;
        this.childService = childService;
        this.classQueueService = classQueueService;
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

    @GetMapping("/get/child/class")
    public ResponseEntity<?> getClassByChildSessionId(@RequestHeader("Authorization") String token, @RequestHeader("SessionId") String sessionId) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            Child child = childService.getChildBySessionId(sessionId);
            if(child == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Child not found");
            }
            Classes classes = child.getClassId();
            if(classes == null) {
                return ResponseEntity.ok(null);
            }

            ChildClassInfoDto classInfoDto = new ChildClassInfoDto();

            classInfoDto.setSessionId(classes.getSessionId());
            classInfoDto.setClassName(classes.getClassName());
            classInfoDto.setPatronFirstName(classes.getPatron().getFirstName());
            classInfoDto.setPatronLastName(classes.getPatron().getLastName());


            return ResponseEntity.ok(classInfoDto);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/get/all/classes")
    public ResponseEntity<?> getAllClassesName(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            List<Classes> classes = classService.getAllClasses();

            List<ClassInfoDto> classInfoDtos =  ClassesToClassesInfoDtoConverter.ConvertListToDto(classes);

            return ResponseEntity.ok(classInfoDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/post/ask/child")
    public ResponseEntity<?> postNewQueueAsk(@RequestHeader("Authorization") String token, @RequestHeader("ClassSessionId") String classId, @RequestBody String childSessionId) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            Classes classes = classService.getClassBySessionId(classId);
            if(classes == null) {
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Class not found");
            }

            Child child = childService.getChildBySessionId(childSessionId);
            if(child == null) {
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Child not found");
            }

            ClassQueue classQueue = new ClassQueue(child, classes);

            classQueueService.saveClassQueue(classQueue);

            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/get/all/classes/queue/for/user")
    public ResponseEntity<?> getAllClassesQueueForUser(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            List<Classes> userClasses = classService.getClassesByPatron(user);

            List<ClassQueueDto> userClassQueues = new ArrayList<ClassQueueDto>();
            for(Classes classes : userClasses) {
                List<ClassQueue> classQueues = classQueueService.getClassQueuesByClass(classes);

                for(ClassQueue classQueue: classQueues){
                    ClassQueueDto classQueueDto = new ClassQueueDto();
                    classQueueDto.setSessionId(classQueue.getSessionId());

                    classQueueDto.setClassesName(classes.getClassName());
                    classQueueDto.setClassesSessionId(classes.getSessionId());

                    classQueueDto.setChildFullName(classQueue.getChild().getName() + " " + classQueue.getChild().getLastName());
                    classQueueDto.setChildSessionId(classQueue.getChild().getSessionId());

                    userClassQueues.add(classQueueDto);
                }
            }

            return ResponseEntity.ok(userClassQueues);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/post/decide/child")
    public ResponseEntity<?> postDecideOnChildCandidature(@RequestHeader("Authorization") String token, @RequestHeader("Verdict") boolean verdict, @RequestBody String classQueueSessionId) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            ClassQueue classQueue = classQueueService.getClassQueueBySessionId(classQueueSessionId);
            if(classQueue == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Class queue not found");
            }

            Classes classes = classQueue.getClasses();
            if(classes == null ) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Class not found");
            }

            Child child = classQueue.getChild();
            if(child == null ) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Child not found");
            }

            if(verdict) {
                child.setClassId(classes);
                childService.saveChild(child);
                classQueueService.deleteQueueClass(classQueue);
            } else{
                classQueueService.deleteQueueClass(classQueue);
            }

            return ResponseEntity.ok("Ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
}
























