package com.codecool.web.service.simple;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.model.enums.ScheduleType;
import com.codecool.web.service.ScheduleService;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
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
    public List<Schedule> findAll() throws SQLException, ServiceException {
        try {
            return scheduleDao.findAll();
        } catch (IllegalArgumentException ex) {
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public Schedule findById(int scheduleId) throws SQLException, ServiceException {
        try {
            return scheduleDao.findById(scheduleId);
        } catch (IllegalArgumentException ex) {
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public void updateSchedule(int scheduleId, String title, int length) throws SQLException, ServiceException {
        try {
            scheduleDao.update(scheduleId,title,length);
        } catch (IllegalArgumentException ex) {
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public void deleteSchedule(int scheduleId) throws SQLException, ServiceException {
        try {
            scheduleDao.delete(scheduleId);
        } catch (IllegalArgumentException ex) {
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public List<Schedule> findAllByUserId(int userId) throws SQLException, ServiceException {
        try {
            return scheduleDao.findAllByUserId(userId);
        }   catch (IllegalArgumentException ex) {
            throw  new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public List<Schedule> findAllByPublic(ScheduleType scheduleType) throws SQLException, ServiceException {
        try {
            return scheduleDao.findAllByPublic(scheduleType);
        }   catch (IllegalArgumentException ex) {
            throw  new ServiceException(ex.getMessage());
        }
    }
}
