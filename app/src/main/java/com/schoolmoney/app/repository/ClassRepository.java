package com.schoolmoney.app.repository;


import com.schoolmoney.app.entities.Child;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassRepository extends JpaRepository<Classes, Long> {

    Classes findBySessionId(String sessionId);

    List<Classes> findByPatron(User user);

    @Query("SELECT c FROM Child c WHERE c.classId = :classes")
    List<Child> findChildrenByClass(@Param("classes") Classes classes);
}
