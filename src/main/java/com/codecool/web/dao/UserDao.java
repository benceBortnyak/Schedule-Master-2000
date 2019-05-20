package com.codecool.web.dao;

import com.codecool.web.model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {

    void insertUser(User user) throws SQLException;

    List<User> findAll() throws SQLException;
}
