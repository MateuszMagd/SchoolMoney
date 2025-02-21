package com.schoolmoney.app.service;

import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.repository.BillsRepository;
import com.schoolmoney.app.repository.UserRepository;
import com.schoolmoney.app.service.interfaces.IBillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillsService implements IBillsService {
    private BillsRepository billsRepository;
    private UserRepository userRepository;

    @Autowired
    public BillsService(BillsRepository billsRepository, UserRepository userRepository) {
        this.billsRepository = billsRepository;
        this.userRepository = userRepository;
    }


    @Override
    public Bills saveBills(Bills bills) {
        return billsRepository.save(bills);
    }

    @Override
    public Bills getBillsByUserEmail(String email) {
        return userRepository.findBillsByUserEmail(email);
    }

    @Override
    public Bills getBillsBySessionId(String sessionId) {
        return billsRepository.findBySessionId(sessionId);
    }
}
