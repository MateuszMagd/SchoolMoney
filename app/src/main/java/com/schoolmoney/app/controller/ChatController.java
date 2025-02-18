package com.schoolmoney.app.controller;

import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.entities.Messages;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.service.ChatService;
import com.schoolmoney.app.service.interfaces.IChatService;
import com.schoolmoney.app.service.interfaces.IUserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final IChatService chatService;
    private final IUserService userService;

    @Autowired
    public ChatController(IChatService chatService, IUserService userService) {
        this.chatService = chatService;
        this.userService = userService;
    }

    @PostMapping("/send")
    public ResponseEntity<Messages> sendMessage(@RequestBody Messages message) {
        Messages savedMessage = chatService.sendMessage(message);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/conversation/{sesid}")
    public ResponseEntity<?> getConversation(@PathVariable String sesid, @RequestHeader("Authorization") String token) {
        List<Messages> messages;
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            messages = chatService.getMessagesBySessionId(sesid, user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
        return ResponseEntity.ok(messages);
    }
}
