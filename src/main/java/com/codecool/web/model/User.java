package com.codecool.web.model;

import com.codecool.web.model.enums.UserType;

public class User extends AbstractModel{

    private String forename;
    private String lastName;
    private String email;
    private String password;
    private UserType userType;


    public User(int id, String forename, String lastName, String email, String password, UserType userType) {
        super(id);
        this.forename = forename;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }


    public User(int id, String email, UserType userType) {
        super(id);
        this.email = email;
        this.userType = userType;
        this.password = null;
    }

    public String getPassword() {
        return password;
    }

    public String getForename() {
        return forename;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public UserType getUserType() {
        return userType;
    }
}
