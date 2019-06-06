package com.codecool.web.service;

import com.codecool.web.model.User;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;

public interface UserService {

    User loginUser(String email, String password) throws SQLException, ServiceException;

    void addUser(String forename, String lastName, String email, String password) throws SQLException, ServiceException;

    boolean emailVerify(String email) throws SQLException, ServiceException;
}
