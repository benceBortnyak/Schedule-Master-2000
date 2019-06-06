package com.codecool.web.service.simple;

import com.codecool.web.dao.TaskDao;
import com.codecool.web.model.Task;
import com.codecool.web.service.TaskService;
import com.codecool.web.service.exception.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.List;

public class SimpleTaskSerive  implements TaskService {

    private final TaskDao taskDao;

    public SimpleTaskSerive(TaskDao taskDao) {
        this.taskDao =taskDao;
    }

    private static final Logger logger = LoggerFactory.getLogger(SimpleTaskSerive.class);


    @Override
    public Task addTask(int userId, String title, String content) throws SQLException, ServiceException {
        try {
            return taskDao.add(userId, title, content);
        }catch (IllegalArgumentException e ){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public List<Task> wiewTasks(int scheduleId) throws SQLException, ServiceException {
        try{
            return taskDao.findAllByScheduleId(scheduleId);
        }catch(IllegalArgumentException e ){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void updateTask(int taskId, String title, String content) throws SQLException,ServiceException {
        try{
            taskDao.updateTask(taskId,title,content);
        }catch (IllegalArgumentException e ){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void deleteTask(int taskId) throws SQLException, ServiceException {
        try{
            taskDao.deleteTask(taskId);
        }catch (IllegalArgumentException e ){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void addToSlot(int slotId, int taskId, int len) throws SQLException, ServiceException {
        try{
            for(int i = 0; i < len; i++) {
                taskDao.addToSlot(slotId + i, taskId);
            }
        }catch (IllegalArgumentException e ){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public Task findById(int taskId) throws SQLException,ServiceException {
        try{
            return taskDao.findById(taskId);
        }catch (IllegalArgumentException e){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public List<Task> findAll() throws SQLException, ServiceException {
        try{
            return taskDao.findAll();
        }catch (IllegalArgumentException e){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public List<Integer> findSlotIdByTaskId(int taskId) throws SQLException,ServiceException {
        try{
            taskDao.findSlotIdByTaskI(taskId);
        }catch (IllegalArgumentException e ){
            logger.debug(e.getMessage());
            throw new ServiceException(e.getMessage());
        }
    }
}
