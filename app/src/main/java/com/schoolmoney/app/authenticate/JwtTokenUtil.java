package com.schoolmoney.app.authenticate;

import com.schoolmoney.app.enums.UserType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtTokenUtil {
    @Value("${jwt.secret}")
    private static String secretKey;

    @Value("${jwt.expiration}")
    private static long expirationTime;

    public static String generateToken(String subject, UserType userType) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(subject)
                .claim("typ", userType)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static Claims verifyToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException ex) {
            throw new RuntimeException("Invalid JWT token", ex);
        }
    }
}

