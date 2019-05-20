package com.codecool.web.model;

import com.codecool.web.model.enums.UserType;

public class User extends AbstractModel{

    private String email;
    private String password;
    private UserType userType;

    public User(int id, String email, String password, UserType userType) {
        super(id);
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
}
