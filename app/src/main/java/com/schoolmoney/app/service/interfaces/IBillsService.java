package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.Bills;

public interface IBillsService {
    Bills saveBills(Bills bills);
    Bills getBillsByUserEmail(String email);
}
