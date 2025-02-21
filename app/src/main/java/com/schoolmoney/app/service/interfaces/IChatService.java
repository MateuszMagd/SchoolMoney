package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.Messages;
import com.schoolmoney.app.entities.User;

import java.util.List;

public interface IChatService {
    Messages sendMessage(Messages message);

    List<Messages> getMessagesBySessionId(String sesid, User author);

}
