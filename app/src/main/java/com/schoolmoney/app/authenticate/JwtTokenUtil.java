package com.schoolmoney.app.authenticate;

import com.schoolmoney.app.enums.UserType;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtTokenUtil {
    // FOR NOW FOR DEBUGING

    //@Value("${jwt.secret}")
    private static final String secretKey = "BDFAFEB861CE7B77AE9FD3434EDCC0987D7A8BBED12A45F1B32FF0C56B041D47";  // 256 bitów

    public static String generateToken(String subject, UserType userType) {
        Date now = new Date();
        // @Value("${jwt.expiration}")
        long expirationTime = 3600000;
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
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            return  claimsJws
                    .getBody();
        } catch (SignatureException ex) {
            throw new RuntimeException("Invalid JWT token", ex);
        } catch (Exception ex) {
            throw new RuntimeException("Invalid JWT token", ex);
        }
    }
}

