package com.codecool.web.dao.database;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.model.enums.ScheduleType;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseScheduleDao extends AbstractDao implements ScheduleDao {
    
    public DatabaseScheduleDao(Connection connection) {
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
    public Schedule add(int userId, String title, int length, ScheduleType scheduleType) throws SQLException {
        if (checkInt(length,1,7)) {
            boolean autoCommit = connection.getAutoCommit();
            connection.setAutoCommit(false);
            String sqlString = "INSERT INTO schedules (user_id, title, length, type) VALUES (?, ?, ?, CAST(? AS schedule_type))";
            try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString, Statement.RETURN_GENERATED_KEYS)) {
                preparedStatement.setInt(1, userId);
                preparedStatement.setString(2, title);
                preparedStatement.setInt(3, length);
                preparedStatement.setString(4, String.valueOf(scheduleType));
                executeInsert(preparedStatement);
                int id = fetchGeneratedId(preparedStatement);
                return new Schedule(id, userId, title, length, scheduleType);
            } catch (SQLException ex) {
                connection.rollback();
                throw ex;
            } finally {
                connection.setAutoCommit(autoCommit);
            }
        } else {
            throw new IllegalArgumentException("Schedule length must be between 0 and 7");
        }
    }
    
    @Override
    public void update(int scheduleId, String title, int length, ScheduleType scheduleType) throws SQLException {
        if(checkInt(length,1,7)) {
            
            boolean autoCommit = connection.getAutoCommit();
            connection.setAutoCommit(false);
            String sqlString = "UPDATE schedules SET title = ?, length = ?,type = ? WHERE schedule_id = ?";
            try(PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
                preparedStatement.setString(1, title);
                preparedStatement.setInt(2, length);
                preparedStatement.setString(3, String.valueOf(scheduleType));
                preparedStatement.setInt(4, scheduleId);
                preparedStatement.executeUpdate();
            }catch (SQLException ex) {
                connection.rollback();
                throw ex;
            } finally {
                connection.setAutoCommit(autoCommit);
            }
        } else {
            throw new IllegalArgumentException("Schedule length must be between 0 and 7");
        }
    }
    
    @Override
    public void delete(int scheduleId) throws SQLException {
    
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlString = "DELETE FROM schedules cascade WHERE schedule_id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setInt(1, scheduleId);
            preparedStatement.execute();
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }
    
    @Override
    public List<Schedule> findAllByUserId(int userId) throws SQLException {
        List<Schedule> scheduleList = new ArrayList<>();
        String sqlString = "SELECT * FROM schedules WHERE user_id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
             preparedStatement.setInt(1,userId);
             ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                scheduleList.add(fetchSchedule(resultSet));
            }
        }
        return scheduleList;
    }
    
    @Override
    public List<Schedule> findAllByPublic(ScheduleType scheduleType) throws SQLException {
        List<Schedule> scheduleList = new ArrayList<>();
        String sqlString = "SELECT * FROM  schedules WHERE type = ?";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setString(1,"PUBLIC");
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()) {
                scheduleList.add(fetchSchedule(resultSet));
            }
        }
        return scheduleList;
    }
    
    private Schedule fetchSchedule(ResultSet resultSet) throws SQLException {
        Integer scheduleId = resultSet.getInt("schedule_id");
        int userId = resultSet.getInt("user_id");
        String title = resultSet.getString("title");
        int length = resultSet.getInt("length");
        ScheduleType scheduleType = ScheduleType.valueOf(resultSet.getString("type"));
        
        return new Schedule(scheduleId, userId, title, length, scheduleType);
    }



}
