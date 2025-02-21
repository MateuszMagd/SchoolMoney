package com.schoolmoney.app.service;

import com.schoolmoney.app.entities.ClassQueue;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.repository.ClassQueueRepository;
import com.schoolmoney.app.service.interfaces.IClassQueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassQueueService implements IClassQueueService {
    private ClassQueueRepository classQueueRepository;

    @Autowired
    public ClassQueueService(ClassQueueRepository classQueueRepository) {
        this.classQueueRepository = classQueueRepository;
    }

    @Override
    public void saveClassQueue(ClassQueue classQueue) {
        classQueueRepository.save(classQueue);
    }

    @Override
    public List<ClassQueue> getClassQueuesByClass(Classes classes) {
        return classQueueRepository.findByClasses(classes);
    }

    @Override
    public ClassQueue getClassQueueBySessionId(String sessionId) {
        return classQueueRepository.findBySessionId(sessionId);
    }

    @Override
    public void deleteQueueClass(ClassQueue classQueue) {
        classQueueRepository.delete(classQueue);
    }
}
