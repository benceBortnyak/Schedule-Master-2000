package com.codecool.web.dao.database;

import com.codecool.web.dao.UserDao;
import com.codecool.web.model.User;
import com.codecool.web.model.enums.UserType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DatabaseUserDao extends AbstractDao implements UserDao {
    public DatabaseUserDao(Connection connection) {
        super(connection);
    }


    @Override
    public User findByEmail(String email) throws SQLException {
        if (email == null || "".equals(email)) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        String sql = "SELECT user_id, email, password, user_type FROM users WHERE email = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchUser(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public void add(String forename, String lastName, String email, String password) throws SQLException {
        if (email == null || "".equals(email) || password == null || "".equals(password)) {
            throw new IllegalArgumentException("Password or email cannot be null or empty");
        }
        String sql = "INSERT INTO users (forename, lastName, email, password, user_type) VALUES (?, ?, ?, ?, 'USER')";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, forename);
            statement.setString(2, lastName);
            statement.setString(3, email);
            statement.setString(4, password);
            executeInsert(statement);
        }
    }

    @Override
    public List<User> findAll() throws SQLException {
        return null;
    }

    private User fetchUser(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("user_id");
        String email = resultSet.getString("email");
        String password = resultSet.getString("password");
        UserType userType = UserType.valueOf(resultSet.getString("user_type"));
        return new User(id, email, password, userType);
    }
}
