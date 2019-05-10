package com.codecool.web.model;

public class User {

    private int user_id;
    private String email;
    private String password;
    private UserType userType;

    public User(int user_id, String email, String password, UserType userType) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    public User(int user_id, String email, UserType userType) {
        this.user_id = user_id;
        this.email = email;
        this.userType = userType;
        this.password = null;
    }
}
