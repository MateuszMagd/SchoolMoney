package com.schoolmoney.app.utils;

import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

public class Utils {
    public static byte[] loadPhoto(String fileName) throws IOException {
        ClassPathResource resource = new ClassPathResource("photo/" + fileName);
        Path path = Paths.get(resource.getURI());
        return Files.readAllBytes(path);
    }

    public static byte[] decodePhoto(String photo) {
        return Base64.getDecoder().decode(photo);
    }

}
