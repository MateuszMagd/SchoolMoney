package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long> {
    @Query("SELECT c FROM Child c JOIN c.parents p WHERE p.email = :email")
    List<Child> findChildrenByParentEmail(String email);

    Child findBySessionId(String sessionId);

}
