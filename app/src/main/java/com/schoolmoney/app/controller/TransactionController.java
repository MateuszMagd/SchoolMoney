package com.schoolmoney.app.controller;

import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.BillsHistoryDto;
import com.schoolmoney.app.dto.TransactionInfoDto;
import com.schoolmoney.app.entities.*;
import com.schoolmoney.app.enums.OperationType;
import com.schoolmoney.app.service.FundService;
import com.schoolmoney.app.service.interfaces.*;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final IChildService childService;
    private final IUserService userService;
    private final IBillsHistoryService billsHistoryService;
    private final IBillsService billsService;
    private final IFundService fundService;

    public TransactionController(IChildService childService, IUserService userService, IBillsHistoryService billsHistoryService, IBillsService billsService, IFundService fundService) {
        this.childService = childService;
        this.userService = userService;
        this.billsHistoryService = billsHistoryService;
        this.billsService = billsService;
        this.fundService = fundService;
    }

    @RequestMapping("/get/all")
    public ResponseEntity<?> getAllPossibleTransactionForUser(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            List<User> userList = userService.getAllUsers();
            if(userList == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Did not found users");
            }

            List<TransactionInfoDto> resultList = new ArrayList<TransactionInfoDto>();

            for(User user: userList) {
                if(user.getBills() == null || user == null) {
                    continue;
                }
                TransactionInfoDto info = new TransactionInfoDto();
                info.setName(user.getFirstName() + " " + user.getLastName());
                info.setSessionId(user.getBills().getSessionId());
                info.setAmountNeeded(0);

                resultList.add(info);
            }


            List<Child> childOfMainUser = childService.getChildrenByParentEmail(claims.getSubject());
            for(Child child : childOfMainUser) {
                if(child.getClassId() == null) {
                    continue;
                }
                Classes classes = child.getClassId();
                List<Fund> funds = fundService.getFundByClass(classes);
                for(Fund fund: funds) {
                    TransactionInfoDto info = new TransactionInfoDto();
                    info.setName(fund.getFundName() + " - " + child.getName() + " " + child.getLastName());
                    info.setDescription(fund.getDescription());
                    info.setPayForWho(child.getName() + " " + child.getLastName() );
                    info.setSessionId(fund.getBills().getSessionId());
                    info.setAmountNeeded(fund.getMoneyPerKid());

                    resultList.add(info);
                }

            }


            return ResponseEntity.ok(resultList);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access!");
        }
    }

    @RequestMapping("/create")
    public ResponseEntity<?> createTransaction(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> transactionData) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);

            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
            }

            Bills bills = user.getBills();
            if(bills == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No bills connected to user!");
            }
            float amount = Float.parseFloat(transactionData.get("amountToPay"));
            if(bills.getBalance() < amount) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Not enough money on account");
            }
            // It's sessionId Of person bills or fund bills
            String transactionSessionId = transactionData.get("tSessionId");



            Bills receiver = billsService.getBillsBySessionId(transactionSessionId);

            BillsHistory newTrsancation = new BillsHistory();
            newTrsancation.setDate(LocalDate.now());
            newTrsancation.setSender(bills);
            newTrsancation.setReciver(receiver);
            newTrsancation.setAmount(amount);
            newTrsancation.setOperationType(OperationType.TRANSFER);

            // Check for subject
            String subjectName = transactionData.get("sSessionId");
            if(subjectName.equals(token))
            {
                newTrsancation.setSubject(user.getBills());
            }
            else {
                String[] split_name = subjectName.split(" ");
                List<Child> children = childService.getChildrenByParentEmail(user.getEmail());
                if(children == null || children.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subject not found");
                }
                for(Child child: children) {
                    if(child.getName().equals(split_name[0]) && child.getLastName().equals(split_name[1])) {
                        newTrsancation.setSubject(child.getBills());
                        break;
                    }
                }
            }

            billsHistoryService.saveBillsHistory(newTrsancation);
            return ResponseEntity.status(HttpStatus.OK).body("Ok");
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }

    }

    @RequestMapping("get/all/user/transactions")
    public ResponseEntity<?> getAllUserTransaction(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            List<BillsHistory> myBillsHistoryAsSubject = billsHistoryService.getBillsHistoriesBySubject(user.getBills());
            List<BillsHistory> myBillsHistoryAsSender = billsHistoryService.getBillsHistoryBySender(user.getBills());

            List<BillsHistory> combine = Stream.of(myBillsHistoryAsSubject,
                    myBillsHistoryAsSender).flatMap(List::stream).toList();
            List<BillsHistoryDto> billsHistoryDtos = new ArrayList<BillsHistoryDto>();

            for(BillsHistory billsHistory: combine) {
                if(billsHistory == null)
                    continue;

                BillsHistoryDto newBillsHistoryDtos = new BillsHistoryDto();
                newBillsHistoryDtos.setDate(billsHistory.getDate());
                newBillsHistoryDtos.setText(billsHistory.getText());

                newBillsHistoryDtos.setOperationType(billsHistory.getOperationType());
                newBillsHistoryDtos.setAmountSended(billsHistory.getAmount());

                if(billsHistory.getSender().equals(user.getBills())) {
                    // If yes then we have to check who is reciver
                    User toWhoWasSend = userService.getUserByBill(billsHistory.getReciver());
                    if(toWhoWasSend == null)
                    {
                        Fund fund = fundService.getFundByBills(billsHistory.getReciver());
                        if(fund == null) {
                            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fund not found");
                        }
                        newBillsHistoryDtos.setReceiverFullName(fund.getFundName());
                    }
                    else {
                        newBillsHistoryDtos.setReceiverFullName(toWhoWasSend.getFirstName() + " " + toWhoWasSend.getLastName());
                    }

                }
                else {
                    // If no then we have to check who is a sender

                    if(billsHistory.getOperationType() == OperationType.REFUND) {
                        // Refund is only done by fund
                        Fund fund = fundService.getFundByBills(billsHistory.getSender());
                        if(fund == null) {
                            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fund not found");
                        }
                        newBillsHistoryDtos.setReceiverFullName(fund.getFundName());
                    }
                    else {
                        User senderUser = userService.getUserByBill(billsHistory.getSender());
                        if(senderUser == null)
                        {
                            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                        }
                        newBillsHistoryDtos.setReceiverFullName(senderUser.getFirstName() + " " + senderUser.getLastName());
                    }

                }

                billsHistoryDtos.add(newBillsHistoryDtos);
            }

            return ResponseEntity.ok(billsHistoryDtos);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

}
