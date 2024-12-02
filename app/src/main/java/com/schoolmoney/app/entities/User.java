package com.schoolmoney.app.entities;

import com.schoolmoney.app.enums.UserType;
import com.schoolmoney.app.entities.Bills;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String userSessionId;
    @Nonnull
    private UserType userType;
    @Nonnull
    private String email;
    @Nonnull
    private String password; // ! This should be a hash in database !
    @Nonnull
    private String salt;
    private String pesel;
    private byte[] photo ;
    @ManyToOne
    private Bills bills;

    public User(@Nonnull String email,@Nonnull String password, @Nonnull String salt,@Nonnull String pesel, byte[] photo) {
        this.userSessionId = UUID.randomUUID().toString();
        this.userType = UserType.PARENT;
        // this.bills = // <- here will be bills

        this.email = email;
        this.password = password;
        this.salt = salt;
        this.pesel = pesel;
        this.photo = photo;
    }
    public User() {
        this.userSessionId = UUID.randomUUID().toString();
        this.userType = UserType.PARENT;
        // this.bills = // <- here will be bills
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

    @Nonnull
    public String getPassword() {
        return password;
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
}
