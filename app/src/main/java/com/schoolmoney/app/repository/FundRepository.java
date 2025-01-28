package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Fund;
import com.schoolmoney.app.entities.Bills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FundRepository extends JpaRepository<Fund, Long> {
    Fund findFundById(Long id);

    // TODO query to find user's funds
    List<Fund> findDistinctFundsForUser(@Param("userId") Long userId);
}
