package com.schoolmoney.app.service.interfaces;

import com.itextpdf.text.Document;
import com.schoolmoney.app.entities.Fund;

public interface IPDFService {

    public Document generatePdf(Fund fund);
}
