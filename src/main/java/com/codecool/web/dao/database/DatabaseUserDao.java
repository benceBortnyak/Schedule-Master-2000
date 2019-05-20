package com.codecool.web.dao.database;

import com.codecool.web.dao.UserDao;
import com.codecool.web.model.User;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class DatabaseUserDao extends AbstractDao implements UserDao {
    DatabaseUserDao(Connection connection) {
        super(connection);
    }


    @Override
    public void add(User user) throws SQLException {

    }

    @Override
    public List<User> findAll() throws SQLException {
        return null;
    }
}
