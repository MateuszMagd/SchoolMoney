package com.schoolmoney.app.service;

import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.repository.ChildRepository;
import com.schoolmoney.app.service.interfaces.IChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildService implements IChildService {
    private final ChildRepository childRepository;

    @Autowired
    public ChildService(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    @Override
    public List<Child> getChildrenByParentEmail(String email) {
        return childRepository.findChildrenByParentEmail(email);
    }

    @Override
    public Child getChildBySessionId(String sessionId) {
        return childRepository.findBySessionId(sessionId);
    }

    @Override
    public void saveChild(Child child) {
        childRepository.save(child);
    }

    @Override
    public List<Child> getAllChildren() {
        return childRepository.findAll();
    }


}
