package com.school.app;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Mapuje wszystkie endpointy
                .allowedOrigins("*") // Pozwala na dostęp z dowolnego źródła (można również określić konkretny adres URL)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Określa dozwolone metody HTTP
                .allowedHeaders("*"); // Określa dozwolone nagłówki HTTP
    }
}
