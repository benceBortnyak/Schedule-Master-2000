package com.codecool.web.dao.database;

import com.codecool.web.dao.TaskDao;
import com.codecool.web.model.Task;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseTaskDao extends AbstractDao implements TaskDao {
    
    public DatabaseTaskDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Task> findAllByScheduleId(int taskId) throws SQLException {
        
        List<Task> taskList = new ArrayList<>();
        String sqlString = "SELECT t.task_id, t.user_id, t.title, t.type, t.content, sche.schedule_id " +
                "FROM schedules AS sche " +
                "JOIN columns AS c ON c.schedule_id = sche.schedule_id " +
                "JOIN slots AS s ON s.column_id = c.column_id " +
                "JOIN slots_task AS st ON st.slot_id = s.slot_id " +
                "JOIN tasks AS t ON t.task_id = st.task_id " +
                "WHERE t.task_id = ?";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sqlString)){
            preparedStatement.setInt(1,taskId);
            try(ResultSet resultSet = preparedStatement.executeQuery()){
                while(resultSet.next()){
                    taskList.add(fetchTask(resultSet));
                }
            }
        }
        return taskList;
    }
    
    @Override
    public Task findById() throws SQLException {
        return null;
    }
    
    @Override
    public Task add(int userId, String title) throws SQLException {
        return null;
    }
    
    public Task fetchTask(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("id");
        int userId = resultSet.getInt("userId");
        String title = resultSet.getString("title");
        
        return new Task(id,userId,title);
    }
}
