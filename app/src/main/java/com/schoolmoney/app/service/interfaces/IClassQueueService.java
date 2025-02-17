package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.ClassQueue;
import com.schoolmoney.app.entities.Classes;

import java.util.List;

public interface IClassQueueService {
    void saveClassQueue(ClassQueue classQueue);
    List<ClassQueue> getClassQueuesByClass(Classes classes);
    ClassQueue getClassQueueBySessionId(String sessionId);

    void deleteQueueClass(ClassQueue classQueue);
}
