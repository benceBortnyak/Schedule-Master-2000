package com.codecool.web.service.simple;

import com.codecool.web.dao.TaskDao;
import com.codecool.web.model.Task;
import com.codecool.web.service.TaskService;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public class SimpleTaskSerive  implements TaskService {

    private final TaskDao taskDao;

    public SimpleTaskSerive(TaskDao taskDao) {
        this.taskDao =taskDao;
    }


    @Override
    public void addTask(int userId, String title, String type, String content) throws SQLException, ServiceException {
        try {
            taskDao.add(userId, title, type, content);
        }catch (IllegalArgumentException e ){
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public List<Task> wiewTasks(int scheduleId) throws SQLException, ServiceException {
        try{
            return taskDao.findAllByScheduleId(scheduleId);
        }catch(IllegalArgumentException e ){
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void updateTask(int taskId, String title, String content) throws SQLException,ServiceException {
        try{
            taskDao.updateTask(taskId,title,content);
        }catch (IllegalArgumentException e ){
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void deleteTask(int taskId) throws SQLException, ServiceException {
        try{
            taskDao.deleteTask(taskId);
        }catch (IllegalArgumentException e ){
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void addToSlot(int slotId, int taskId) throws SQLException, ServiceException {
        try{
            taskDao.addToSlot(slotId,taskId);
        }catch (IllegalArgumentException e ){
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public Task findById(int taskId) throws SQLException,ServiceException {
        try{
            return taskDao.findById(taskId);
        }catch (IllegalArgumentException e){
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public List<Task> findAll() throws SQLException, ServiceException {
        try{
            return taskDao.findAll();
        }catch (IllegalArgumentException e){
            throw new ServiceException(e.getMessage());
        }
    }
}
