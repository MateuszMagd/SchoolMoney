package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.*;

import java.util.List;

public interface IFundService {
    List<Fund> getFundsByUser(User user);

    Fund getFundByID(Long id);

    Fund getFundBySessionId(String sessionId);

    List<Fund> getFundByClass(Classes classes);
    Fund getFundByBills(Bills bills);
}
