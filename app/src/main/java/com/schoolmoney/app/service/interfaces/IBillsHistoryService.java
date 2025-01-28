package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.BillsHistory;
import com.schoolmoney.app.entities.Fund;
import org.apache.catalina.LifecycleState;

import java.util.List;

public interface IBillsHistoryService {

    List<BillsHistory> getBillsHistoryByFund(Fund fund);
}
