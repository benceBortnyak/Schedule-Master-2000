package com.codecool.web.service.simple;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.service.ScheduleService;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SimpleScheduleService implements ScheduleService {
    
    public final ScheduleDao scheduleDao;
    
    public SimpleScheduleService(ScheduleDao scheduleDao) {
        this.scheduleDao = scheduleDao;
    }
    
    @Override
    public void addSchedule(int userId, String title, int length) throws SQLException, ServiceException {
        try {
            scheduleDao.add(userId,title,length);
        } catch (IllegalArgumentException ex){
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public List<Schedule> viewSchedules() throws SQLException, ServiceException {
        try {
            return scheduleDao.findAll();
        } catch (IllegalArgumentException ex) {
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public Schedule updateSchedule(int userId, String title, int length) throws SQLException, ServiceException {
        return null;
    }
    
    @Override
    public Schedule deleteSchedule(int userId, String title, int length) throws SQLException, ServiceException {
        return null;
    }
}
