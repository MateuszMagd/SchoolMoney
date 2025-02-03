package com.schoolmoney.app.repository;

import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.entities.BillsHistory;
import com.schoolmoney.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BillsHistoryRepository extends JpaRepository<BillsHistory, Long>  {
    @Query("SELECT bh FROM BillsHistory bh JOIN Fund f on bh.reciver.id=f.id WHERE f.sessionId = :SessionId")
    List<BillsHistory> findBillsHistoryBySessionId(@Param("SessionId") String SessionId);

    @Query("SELECT bh FROM BillsHistory bh WHERE bh.reciver.id = :fundId")
    List<BillsHistory> findBillsHistoryByFundId(@Param("fundId") Long fundId);

}
