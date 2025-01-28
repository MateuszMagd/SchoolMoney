package com.schoolmoney.app.service.interfaces;

import com.itextpdf.text.Document;

public interface IPDFService {

    public Document generatePdf(Long id);
}
