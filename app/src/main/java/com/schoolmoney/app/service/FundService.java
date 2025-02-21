package com.schoolmoney.app.service;

import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.entities.Classes;
import com.schoolmoney.app.entities.Fund;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.repository.FundRepository;
import com.schoolmoney.app.service.interfaces.IFundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundService implements IFundService {
    private final FundRepository fundRepository;

    @Autowired
    public FundService(FundRepository fundRepository)
    {
        this.fundRepository = fundRepository;
    }

    @Override
    public List<Fund> getFundsByUser(User user)
    {
        return null;
    }

    @Override
    public Fund getFundByID(Long id)
    {
        return fundRepository.findFundById(id);
    }

    @Override
    public Fund getFundBySessionId(String sessionId)
    {
        return fundRepository.findFundBySessionId(sessionId);
    }

    @Override
    public List<Fund> getFundByClass(Classes classes) {
        return fundRepository.findByClassId(classes);
    }

    @Override
    public Fund getFundByBills(Bills bills) {
        return fundRepository.findByBills(bills);
    }
}
