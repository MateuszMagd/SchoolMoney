package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.Messages;
import com.schoolmoney.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Messages, Long> {
    List<Messages> findAllByReceiverClassSessionId(String sesid);

    List<Messages> findAllByAuthorAndReceiverParent(User author, User receiverParent);
}
