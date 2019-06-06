package com.codecool.web.service.simple;

import com.codecool.web.dao.UserDao;
import com.codecool.web.dao.database.DatabaseUserDao;
import com.codecool.web.model.User;
import com.codecool.web.service.UserService;
import com.codecool.web.service.exception.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;

public class SimpleUserService implements UserService {
    
    private final UserDao userDao;
    
    public SimpleUserService(UserDao userDao) {
        this.userDao = userDao;
    }

    private static final Logger logger = LoggerFactory.getLogger(SimpleUserService.class);
    
    @Override
    public User loginUser(String email, String password) throws SQLException, ServiceException {
        try {
            User user = userDao.findByEmail(email);
            if (user == null || !user.getPassword().equals(password)) {
                throw new ServiceException("Bad login");
            }
            return user;
        } catch (IllegalArgumentException ex) {
            logger.debug(ex.getMessage());
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public void addUser(String forename, String lastName, String email, String password) throws SQLException, ServiceException {
        try {
            userDao.add(forename, lastName, email, password);
        } catch (IllegalArgumentException ex) {
            logger.debug(ex.getMessage());
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public boolean emailVerify(String email) throws SQLException, ServiceException {
        try {
            if (userDao.findByEmail(email) != null) {
                return true;
            } else {
                return false;
            }
        }catch (IllegalArgumentException ex) {
            logger.debug(ex.getMessage());
            throw new ServiceException(ex.getMessage());
        }
    }
}
