package com.schoolmoney.app.controller;


import com.itextpdf.text.Document;
import com.schoolmoney.app.authenticate.JwtTokenUtil;
import com.schoolmoney.app.dto.UserInfoDto;
import com.schoolmoney.app.entities.Fund;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.repository.FundRepository;
import com.schoolmoney.app.service.interfaces.IFundService;
import com.schoolmoney.app.service.interfaces.IPDFService;
import com.schoolmoney.app.service.interfaces.IUserService;
import com.schoolmoney.app.utils.converters.UserToUserInfoDtoConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/funds")
public class RaportController {

    private final IFundService fundService;
    private final IUserService userService;
    private final IPDFService pdfService;

    @Autowired
    public RaportController(IFundService fundService, IUserService userService, IPDFService pdfService)
    {
        this.fundService = fundService;
        this.userService = userService;
        this.pdfService = pdfService;
    }

    @GetMapping
    public ResponseEntity<?> getUserByEmail(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtil.verifyToken(token);
            User user = userService.getUserByEmail(claims.getSubject());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Didn't find user with this email");
            }
            UserInfoDto userDto = UserToUserInfoDtoConverter.UserToUserDto(user);

            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }


    @GetMapping("/download/pdf/{pdfId}")
    public ResponseEntity<Document> downloadPdf(@PathVariable long pdfId) throws IOException {
        Document document = pdfService.generatePdf(pdfId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "Raport_" + pdfId + ".pdf");  // Filename for download

        return new ResponseEntity<>(document, headers, HttpStatus.OK);
    }

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

}
