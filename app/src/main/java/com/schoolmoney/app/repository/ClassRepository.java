package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Class;
import com.schoolmoney.app.entities.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Long> {
    Class findClassByClassName(String name);
}
