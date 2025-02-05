package com.schoolmoney.app.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.schoolmoney.app.entities.Bills;
import com.schoolmoney.app.entities.BillsHistory;
import com.schoolmoney.app.entities.Fund;
import com.schoolmoney.app.entities.User;
import com.schoolmoney.app.repository.BillsHistoryRepository;
import com.schoolmoney.app.repository.FundRepository;
import com.schoolmoney.app.repository.UserRepository;
import com.schoolmoney.app.service.interfaces.IPDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
public class PDFService implements IPDFService {

    private final FundRepository fundRepository;
    private final UserRepository userRepository;
    private final BillsHistoryRepository billsHistoryRepository;

    @Autowired
    public PDFService(FundRepository fundRepository, UserRepository userRepository, BillsHistoryRepository billsHistoryRepository)
    {
        this.fundRepository = fundRepository;
        this.userRepository = userRepository;
        this.billsHistoryRepository = billsHistoryRepository;
    }

    @Override
    public Document generatePdf(Fund fund) {
        Document document = new Document(PageSize.A4);
        try {

            PdfWriter.getInstance(document, new FileOutputStream("Raport_" + fund.getId() + ".pdf"));

//            Fund fund = fundRepository.findFundById(id);

            document.open();
            BaseFont timesNewRoman = BaseFont.createFont("font/AbhayaLibre-Bold.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font font = new Font(timesNewRoman, 25, Font.NORMAL, BaseColor.BLACK);
//            Font font = FontFactory.getFont("Times New Roman", "Cp1250", BaseFont.EMBEDDED, 25, Font.BOLD, BaseColor.BLACK);
            Paragraph paragraph = new Paragraph("Raport ze zbiórki nr " + fund.getId(), font);
            document.add(paragraph);

            timesNewRoman = BaseFont.createFont("font/AbhayaLibre-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            font = new Font(timesNewRoman, 12, Font.NORMAL, BaseColor.BLACK);
//            font = FontFactory.getFont("Times New Roman", "Cp1250", BaseFont.EMBEDDED, 12,Font.NORMAL, BaseColor.BLACK);


            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String formattedDate = dateFormatter.format(Instant.now().atZone(ZoneId.systemDefault()));
            paragraph = new Paragraph("Data utworzenia raportu: " + formattedDate, font);
            document.add(paragraph);

            paragraph = new Paragraph("Tytuł zbiórki: " + fund.getFundName(), font);
            document.add(paragraph);

            paragraph = new Paragraph("Patron zbiórki: " + fund.getPatron().getFirstName() + " " + fund.getPatron().getLastName(), font);
            document.add(paragraph);

            paragraph = new Paragraph("Opis zbiórki: " + fund.getDescription(), font);
            document.add(paragraph);

            paragraph = new Paragraph("Data utworzenia zbiórki: " + fund.getStartDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")), font);
            document.add(paragraph);

            paragraph = new Paragraph("Data zakończenia zbiórki: " + fund.getEndDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")), font);
            document.add(paragraph);

            paragraph = new Paragraph("Status zbiórki: " + (fund.isOpen()?"otwarta":"zamknięta"), font);
            document.add(paragraph);

            paragraph = new Paragraph("Kwota zebrana / Kwota docelowa: " + String.format("%.2f", fund.getMoneyEarned()).replace('.', ',')  + " / " + String.format("%.2f", fund.getMoneyGoal()).replace('.', ',') + " zł" , font);
            document.add(paragraph);

            paragraph = new Paragraph("\n\n", font);
            document.add(paragraph);

            Image image = Image.getInstance(fund.getPhoto());
            image.scaleToFit(100, 100);
            image.setAbsolutePosition(document.getPageSize().getWidth() - image.getScaledWidth() - 50, document.getPageSize().getHeight() - image.getScaledHeight() - 100);
            document.add(image);

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);

            table.addCell(new Phrase("Dzień", font));
            table.addCell(new Phrase("Nadawca", font));
            table.addCell(new Phrase("Tytuł", font));
            table.addCell(new Phrase("Kwota", font));

            document.add(table);

            for(BillsHistory billsHistory : billsHistoryRepository.findBillsHistoryBySessionId(fund.getSessionId()))
            {
                User user = userRepository.findUserBySenderId(billsHistory.getSender().getSessionId());
                table = new PdfPTable(4);
                table.setWidthPercentage(100);
                table.addCell(new Phrase(billsHistory.getDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")), font));
                table.addCell(new Phrase(user.getFirstName() + " " + user.getLastName(), font));
                table.addCell(new Phrase(billsHistory.getText(), font));
                table.addCell(new Phrase(String.format("%.2f", billsHistory.getAmount()).replace('.', ','), font));
                document.add(table);
            }



            document.close();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
        return document;
    }


}
