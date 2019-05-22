package com.codecool.web.service.simple;

import com.codecool.web.dao.ScheduleDao;
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
    public Task updateTask(int userId, String title, String type, String content) throws SQLException, ServiceException {



        return null;
    }

    @Override
    public Task removeTask(int userId, String title, String type, String content) throws SQLException, ServiceException {



        return null;
    }
}
