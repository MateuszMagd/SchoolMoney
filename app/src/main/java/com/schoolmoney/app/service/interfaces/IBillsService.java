package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.Bills;

public interface IBillsService {
    public Bills saveBills(Bills bills);
    public Bills getBillsByUserEmail(String email);
}
