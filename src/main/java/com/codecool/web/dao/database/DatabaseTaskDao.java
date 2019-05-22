package com.codecool.web.dao.database;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.dao.TaskDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.model.Task;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseTaskDao extends AbstractDao implements TaskDao {
    
    public DatabaseTaskDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Task> findAllByScheduleId(int scheduleId) throws SQLException {
        
        List<Task> taskList = new ArrayList<>();
        String sqlString = "SELECT t.task_id, t.user_id, t.title, t.type, t.content, sche.schedule_id " +
                "FROM schedules AS sche " +
                "JOIN columns AS c ON c.schedule_id = sche.schedule_id " +
                "JOIN slots AS s ON s.column_id = c.column_id " +
                "JOIN slots_tasks AS st ON st.slot_id = s.slot_id " +
                "JOIN tasks AS t ON t.task_id = st.task_id " +
                "WHERE sche.schedule_id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setInt(1, scheduleId);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    taskList.add(fetchTask(resultSet));
                }
            }
        }
        return taskList;
    }
    
    @Override
    public Task findById(int taskId) throws SQLException {
        
        String sqlString = "SELECT task_id,user_id,title,type,content FROM tasks WHERE task_id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setInt(1, taskId);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    return fetchTask(resultSet);
                }
            }
        }
        return null;
    }
    
    @Override
    public Task add(int userId, String title, String type, String content) throws SQLException {
        if (type != "PUBLIC" || type != "PRIVATE") {
            throw new IllegalArgumentException("type only can be PUBLIC or PRIVATE");
        }
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlString = "INSERT INTO tasks (user_id, title, type, content) VALUES (?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setInt(1, userId);
            preparedStatement.setString(2, title);
            preparedStatement.setString(3, type);
            preparedStatement.setString(4, content);
            executeInsert(preparedStatement);
            int id = fetchGeneratedId(preparedStatement);
            return new Task(id, userId, title, type, content);
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }
    
    @Override
    public void addToSlot(int slotId,int taskId) throws SQLException{
        
        boolean autoCommit= connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlString = "INSERT INTO slots_tasks(slot_id,task_id) VALUES (?, ?)";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sqlString)){
            preparedStatement.setInt(1,slotId);
            preparedStatement.setInt(2,taskId);
            preparedStatement.executeUpdate();
        }catch (SQLException ex){
            connection.rollback();
            throw ex;
        }finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    public void upadteTask(int taskId,String title,String content) throws SQLException{
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlStatement = "";

    }


    
    private Task fetchTask(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("id");
        int userId = resultSet.getInt("userId");
        String title = resultSet.getString("title");
        String type = resultSet.getString("type");
        String content = resultSet.getString("content");
        
        return new Task(id, userId, title, type, content);
    }

}
