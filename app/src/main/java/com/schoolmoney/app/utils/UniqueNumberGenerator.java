package com.schoolmoney.app.utils;

import java.util.UUID;

public class UniqueNumberGenerator {
    public static String getUniqueNumber() {
        UUID uuid = UUID.randomUUID();
        return String.valueOf(Math.abs(uuid.getMostSignificantBits()));
    }
}
