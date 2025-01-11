package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Bills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillsRepository extends JpaRepository<Bills, Long> {

}
