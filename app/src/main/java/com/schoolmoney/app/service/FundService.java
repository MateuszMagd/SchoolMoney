package com.schoolmoney.app.service;

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
}
