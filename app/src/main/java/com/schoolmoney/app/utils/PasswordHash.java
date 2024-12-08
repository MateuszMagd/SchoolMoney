package com.schoolmoney.app.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class PasswordHash {
    public static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public static String hashPasswordWithSalt(String password, String salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt.getBytes());
        byte[] hashedPassword = md.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hashedPassword);
    }

    public static boolean verifyPassword(String password, String salt, String passwordToVerify) throws NoSuchAlgorithmException{
        String hashedPassword = hashPasswordWithSalt(password, salt);
        String hashedPasswordToVerify = hashPasswordWithSalt(passwordToVerify, salt);
        return hashedPassword.equals(hashedPasswordToVerify);
    }
}

