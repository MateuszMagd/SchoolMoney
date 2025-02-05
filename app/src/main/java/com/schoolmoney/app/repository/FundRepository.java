package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Fund;
import com.schoolmoney.app.entities.Bills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FundRepository extends JpaRepository<Fund, Long> {
    Fund findFundById(Long id);

    Fund findFundBySessionId(String sessionId);


//    @Query("SELECT distinct f FROM Fund f join Class c on f.classId=c join Child ch on c=ch.classId join User u on ch.parents=:userID")
//    List<Fund> findDistinctFundsForUser(@Param("userId") Long userId);
}
