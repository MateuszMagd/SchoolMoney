package com.schoolmoney.app.entities;

import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.entities.Bills;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String sessionId;
    @Nonnull
    @Enumerated(EnumType.STRING)
    private UserType userType;
    @Nonnull
    private String email;
    @Nonnull
    private String password; // ! This should be a hash in database !
    @Nonnull
    private String salt;
    private String pesel;
    private String firstName;
    private String lastName;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo ;
    @ManyToOne
    private Bills bills;

    public User(@Nonnull String email, @Nonnull String password, @Nonnull String salt, String pesel, String firstName, String lastName, byte[] photo, Bills bills) {
        this.sessionId = UUID.randomUUID().toString();
        this.userType = UserType.PARENT;
        this.bills = bills;

        this.email = email;
        this.password = password;
        this.salt = salt;
        this.pesel = pesel;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
    }
    public User() {
        this.sessionId = UUID.randomUUID().toString();
        this.userType = UserType.PARENT;
    }

    public String getSessionId() {
        return sessionId;
    }

    @Nonnull
    public UserType getUserType() {
        return userType;
    }

    public void setUserType(@Nonnull UserType userType) {
        this.userType = userType;
    }

    @Nonnull
    public String getEmail() {
        return email;
    }

    public void setEmail(@Nonnull String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userType.name()));
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Nonnull
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public void setPassword(@Nonnull String password) {
        this.password = password;
    }

    @Nonnull
    public String getSalt() {
        return salt;
    }

    public void setSalt(@Nonnull String salt) {
        this.salt = salt;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Bills getBills() {
        return bills;
    }

    public void setBills(Bills bills) {
        this.bills = bills;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
