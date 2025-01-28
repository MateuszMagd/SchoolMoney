package com.schoolmoney.app.service;


import com.schoolmoney.app.entities.BillsHistory;
import com.schoolmoney.app.entities.Fund;
import com.schoolmoney.app.repository.BillsHistoryRepository;
import com.schoolmoney.app.service.interfaces.IBillsHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillsHistoryService implements IBillsHistoryService {

    private BillsHistoryRepository billsHistoryRepository;

    @Autowired
    public BillsHistoryService(BillsHistoryRepository billsHistoryRepository)
    {
        this.billsHistoryRepository = billsHistoryRepository;
    }
    @Override
    public List<BillsHistory> getBillsHistoryByFund(Fund fund) {
        return billsHistoryRepository.findBillsHistoryByFundId(fund.getId());
    }
}
