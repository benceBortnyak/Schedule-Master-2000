package com.codecool.web.service;

import com.codecool.web.model.Task;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public interface TaskService {
    
    void addTask(int userId,String title,String type,String content) throws SQLException, ServiceException;
    
    List<Task> wiewTasks(int scheduleId) throws SQLException, ServiceException;
    
    Task updateTask(int userId,String title,String type,String content) throws SQLException, ServiceException;
    
    Task removeTask(int userId,String title,String type,String content) throws SQLException, ServiceException;
    
}
