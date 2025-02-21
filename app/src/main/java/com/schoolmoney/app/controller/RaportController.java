package com.schoolmoney.app.controller;


import com.itextpdf.text.Document;
import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.ChildDto;
import com.schoolmoney.app.dto.FundInfoDto;
import com.schoolmoney.app.dto.NewFoundRegister;
import com.schoolmoney.app.dto.UserInfoDto;
import com.schoolmoney.app.entities.*;
import com.schoolmoney.app.enums.ChildFundStatusType;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.repository.FundRepository;
import com.schoolmoney.app.service.interfaces.*;
import com.schoolmoney.app.utils.converters.ChildToChildDtoConverter;
import com.schoolmoney.app.utils.converters.UserToUserInfoDtoConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/funds")
public class RaportController {

    private final IFundService fundService;
    private final IUserService userService;

    private final IChildService childService;
    private final IPDFService pdfService;
    private final IBillsHistoryService billsHistoryService;

    @Autowired
    public RaportController(IFundService fundService, IUserService userService, IPDFService pdfService, IChildService childService, IBillsHistoryService billsHistoryService)
    {
        this.fundService = fundService;
        this.userService = userService;
        this.pdfService = pdfService;
        this.childService = childService;
        this.billsHistoryService = billsHistoryService;
    }

    // ---------------------------------- REPORT API -------------------------------------- \\
    @GetMapping("/download/pdf/{sessionId}")
    public ResponseEntity<Document> downloadPdf(@PathVariable String sessionId) throws IOException {
        Fund fund = fundService.getFundBySessionId(sessionId);
        Document document = pdfService.generatePdf(fund);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "Raport " + fund.getFundName() + ".pdf");  // Filename for download

        return new ResponseEntity<>(document, headers, HttpStatus.OK);
    }


    // ---------------------------------- FUND API -------------------------------------- \\
    @GetMapping("/all")
    public ResponseEntity<?> getFundsByUser(@RequestHeader("Authorization") String token)
    {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Didn't find user with this email");
            }
            if(user.getUserType() != UserType.ADMIN) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            List<Fund> funds = fundService.getFundsByUser(user);


            return ResponseEntity.ok(funds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PostMapping("/new")
    public ResponseEntity<?> createNewFound(@RequestHeader("Authorization") String token, @RequestBody NewFoundRegister newFund) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            Fund fund = new Fund();
            fund.setFundName(newFund.getName());
            fund.setDescription(newFund.getDescription());
            fund.setMoneyGoal(newFund.getGoal());

            return ResponseEntity.ok("Ok");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @GetMapping("/get/my-funds")
    public ResponseEntity<?> getMyFunds(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            List<FundInfoDto> fundInfoDtoList = new ArrayList<FundInfoDto>();

            List<Child> children = childService.getChildrenByParentEmail(user.getEmail());

            for(Child child : children) {
                FundInfoDto fundInfoDto = new FundInfoDto();
                Classes classes = child.getClassId();
                if(classes == null)
                    continue;

                List<Fund> fundsList = fundService.getFundByClass(classes);

                for(Fund fund: fundsList) {
                    ChildDto childDto = ChildToChildDtoConverter.ChildToChildDto(child);
                    fundInfoDto.setChildDto(childDto);
                    fundInfoDto.setName(fund.getFundName());
                    fundInfoDto.setFundSessionId(fund.getSessionId());
                    fundInfoDto.setMoney(fund.getMoneyPerKid());

                    BillsHistory billsHistory = billsHistoryService.getBillsHistoryBySubject(child.getBills());
                    if(billsHistory != null) {
                        if(fund.getBills().getBillsNumber().equals(billsHistory.getReciver().getBillsNumber())){
                            fundInfoDto.setStatus(ChildFundStatusType.PAID);
                        }
                        else {
                            fundInfoDto.setStatus(ChildFundStatusType.NOT_PAID);
                        }
                    }
                    else {
                        fundInfoDto.setStatus(ChildFundStatusType.NOT_PAID);
                    }

                }
                fundInfoDtoList.add(fundInfoDto);
            }
            return ResponseEntity.ok(fundInfoDtoList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access: " + e.getMessage());
        }
    }

}
