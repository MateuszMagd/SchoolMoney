package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.entities.User;

import java.util.List;

public interface IClassService {

    void addNewClass(Classes classes);
    void removeClass(Classes classes);

    void modifyClass(Classes classes);

    List<Classes> getAllClasses();

    Classes getClassBySessionId(String sessionId);

    List<Classes> getClassesByPatron(User user);

    List<Child> getAllChildrenFromClass(Classes classes);
}
