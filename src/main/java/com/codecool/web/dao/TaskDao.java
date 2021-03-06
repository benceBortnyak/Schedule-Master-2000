package com.codecool.web.dao;

import com.codecool.web.model.Task;
import java.sql.SQLException;
import java.util.List;

public interface TaskDao {
    
    
    List<Task> findAllByScheduleId(int taskId) throws SQLException;
    
    Task findById(int taskId) throws SQLException;
    
    Task add(int userId, String title, String content) throws SQLException;
    
    void addToSlot(int slotId, int taskId) throws SQLException;

    void deleteTask(int task) throws SQLException;

    void updateTask(int taskId, String title, String content) throws SQLException;

    List<Task> findAll()throws SQLException;
    
    List<Integer> findSlotIdByTaskId(int taskId) throws SQLException;
    
}
