package com.codecool.web.dao;

import com.codecool.web.model.Task;

import java.sql.SQLException;
import java.util.List;

public interface TaskDao {
    
    
    List<Task> findAllByScheduleId(int taskId) throws SQLException;
    
    Task findById() throws SQLException;
    
    Task add(int userId,String title) throws SQLException;
}
