package com.schoolmoney.app.service.interfaces;

import com.schoolmoney.app.entities.Child;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IChildService {
    List<Child> getChildrenByParentEmail(String email);
}
