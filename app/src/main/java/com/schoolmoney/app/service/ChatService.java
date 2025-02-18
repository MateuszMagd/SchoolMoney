package com.schoolmoney.app.service;

import com.schoolmoney.app.entities.Class;
import com.schoolmoney.app.entities.Messages;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.repository.ClassRepository;
import com.schoolmoney.app.repository.MessageRepository;
import com.schoolmoney.app.repository.UserRepository;
import com.schoolmoney.app.service.interfaces.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ChatService implements IChatService {

    private final MessageRepository messageRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChatService(MessageRepository messageRepository, ClassRepository classRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.classRepository = classRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Messages sendMessage(Messages message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Messages> getMessagesBySessionId(String sesid, User author) {

        List<Messages> messages;

        Class clas = classRepository.findClassByClassName(sesid);
        if(clas!=null)
        {
            messages = messageRepository.findAllByReceiverClassSessionId(clas.getSessionId());
        }
        else
        {
            User receiver = userRepository.findUserBySessionId(sesid);
            messages = messageRepository.findAllByAuthorAndReceiverParent(author, receiver);
            messages.addAll(messageRepository.findAllByAuthorAndReceiverParent(receiver, author));
            messages.sort(Comparator.comparing(Messages::getDate));
        }

        return messages;
    }
}
