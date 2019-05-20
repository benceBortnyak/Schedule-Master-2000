package com.codecool.web.dao.database;

import com.codecool.web.dao.UserDao;

import java.sql.Connection;

public class DatabaseUserDao extends AbstractDao implements UserDao {
    DatabaseUserDao(Connection connection) {
        super(connection);
    }


}
