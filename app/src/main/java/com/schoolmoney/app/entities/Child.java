package com.schoolmoney.app.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;
    @Nonnull
    private String name;
    @Nonnull
    private String lastName;
    @Nonnull
    private LocalDate birthday;
    @Nonnull
    private String pesel;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo;

    @ManyToOne
    private Classes classId;

    @ManyToMany
    @JoinTable(
            name = "user_child",
            joinColumns = @JoinColumn(name = "child_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> parents;

    public Child(@Nonnull String name, @Nonnull String lastName, @Nonnull LocalDate birthday, @Nonnull String pesel, byte[] photo, Classes classId, List<User> parents) {
        this.sessionId = UUID.randomUUID().toString();
        this.name = name;
        this.lastName = lastName;
        this.birthday = birthday;
        this.pesel = pesel;
        this.photo = photo;
        this.classId = classId;
        this.parents = parents;
    }

    public Child() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    @Nonnull
    public String getName() {
        return name;
    }

    public void setName(@Nonnull String name) {
        this.name = name;
    }

    @Nonnull
    public String getLastName() {
        return lastName;
    }

    public void setLastName(@Nonnull String lastName) {
        this.lastName = lastName;
    }

    @Nonnull
    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(@Nonnull LocalDate birthday) {
        this.birthday = birthday;
    }

    @Nonnull
    public String getPesel() {
        return pesel;
    }

    public void setPesel(@Nonnull String pesel) {
        this.pesel = pesel;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Classes getClassId() {
        return classId;
    }

    public void setClassId(Classes classId) {
        this.classId = classId;
    }

    public List<User> getParents() {
        return parents;
    }

    public void setParents(List<User> parents) {
        this.parents = parents;
    }
}
