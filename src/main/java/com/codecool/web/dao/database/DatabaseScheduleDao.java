package com.codecool.web.dao.database;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.model.Schedule;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseScheduleDao extends AbstractDao implements ScheduleDao {
    
    DatabaseScheduleDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Schedule> findAll() throws SQLException {
        
        List<Schedule> scheduleList = new ArrayList<>();
        String sqlString = "SELECT * FROM schedules";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sqlString)) {
            while (resultSet.next()) {
                scheduleList.add(fetchSchedule(resultSet));
            }
        }
        return scheduleList;
    }
    
    @Override
    public Schedule findById(int scheduleId) throws SQLException {
        
        String sqlString = "SELECT schedule_id,user_id,title,length FROM schedules WHERE schedule_id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setInt(1, scheduleId);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchSchedule(resultSet);
                }
            }
        }
        return null;
    }
    
    @Override
    public Schedule add(int userId, String title, int length) throws SQLException {
        if (length < 0 || length > 7) {
            throw new IllegalArgumentException("Schedule length must be between 0 and 7");
        }
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlString = "INSERT INTO schedules (user_id, title, length) VALUES(?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setInt(1, userId);
            preparedStatement.setString(2, title);
            preparedStatement.setInt(3, length);
            executeInsert(preparedStatement);
            int id = fetchGeneratedId(preparedStatement);
            return new Schedule(id, userId, title, length);
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }
    
    @Override
    public Schedule update(int userId, String title, int length) throws SQLException {
        if(length < 0 || length > 7) {
            throw new IllegalArgumentException("Schedule length must be between 0 and 7");
        }
        
        
        return null;
    }
    
    @Override
    public Schedule delete(int userId, String title) throws SQLException {
        return null;
    }
    
    private Schedule fetchSchedule(ResultSet resultSet) throws SQLException {
        Integer scheduleId = resultSet.getInt("scheduleId");
        int userId = resultSet.getInt("userId");
        String title = resultSet.getString("title");
        int length = resultSet.getInt("length");
        
        return new Schedule(scheduleId, userId, title, length);
    }



}
