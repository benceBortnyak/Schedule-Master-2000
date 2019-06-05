package com.codecool.web.service;

import com.codecool.web.model.Task;
import com.codecool.web.service.exception.ServiceException;
import java.sql.SQLException;
import java.util.List;

public interface TaskService {
    
    void addTask(int userId,String title,String content) throws SQLException, ServiceException;
    
    List<Task> wiewTasks(int scheduleId) throws SQLException, ServiceException;

    void updateTask(int taskId, String title, String content) throws SQLException,ServiceException;

    void deleteTask(int taskId) throws SQLException, ServiceException;

    void addToSlot(int slotId, int taskId, int len) throws SQLException, ServiceException;

    Task findById(int taskId) throws SQLException,ServiceException;

    List<Task> findAll() throws SQLException,ServiceException;
    
}
