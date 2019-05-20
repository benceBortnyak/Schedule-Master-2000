package com.codecool.web.service.simple;

import com.codecool.web.model.User;
import com.codecool.web.service.UserService;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;

public class SimpleUserService implements UserService {


    @Override
    public User loginUser(String email, String password) throws SQLException, ServiceException {
        return null;
    }
}
