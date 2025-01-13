package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User getUserByEmail(String email);

    @Query("SELECT u.bills FROM User u WHERE u.email = :email")
    Bills findBillsByUserEmail(String email);
}
