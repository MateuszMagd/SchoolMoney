package com.schoolmoney.app.service;

import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.repository.ClassRepository;
import com.schoolmoney.app.service.interfaces.IClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService implements IClassService {
    private ClassRepository classRepository;

    @Autowired
    public ClassService(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @Override
    public void addNewClass(Classes classes) {
        classRepository.save(classes);
    }

    @Override
    public void removeClass(Classes classes) {
        classRepository.delete(classes);
    }

    @Override
    public void modifyClass(Classes classes) {
        classRepository.save(classes);
    }

    @Override
    public List<Classes> getAllClasses() {
        return classRepository.findAll();
    }

    @Override
    public Classes getClassBySessionId(String sessionId) {
        return classRepository.findBySessionId(sessionId);
    }

    @Override
    public List<Classes> getClassesByPatron(User user) {
        return classRepository.findByPatron(user);
    }

    @Override
    public List<Child> getAllChildrenFromClass(Classes classes) {
        return classRepository.findChildrenByClass(classes);
    }
}
