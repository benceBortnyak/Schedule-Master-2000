package com.codecool.web.service.simple;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.model.enums.ScheduleType;
import com.codecool.web.service.ScheduleService;
import com.codecool.web.service.exception.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.List;

public class SimpleScheduleService implements ScheduleService {
    private static final Logger logger = LoggerFactory.getLogger(SimpleScheduleService.class);
    
    private final ScheduleDao scheduleDao;
    
    public SimpleScheduleService(ScheduleDao scheduleDao) {
        this.scheduleDao = scheduleDao;
    }
    
    @Override
    public Schedule addSchedule(int userId, String title, int length, ScheduleType scheduleType) throws SQLException, ServiceException {
        try {
            Schedule schedule = scheduleDao.add(userId, title, length, scheduleType);
            return schedule;
        } catch (IllegalArgumentException ex){
            logger.debug(ex.getMessage());
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public List<Schedule> findAll() throws SQLException, ServiceException {
        try {
            return scheduleDao.findAll();
        } catch (IllegalArgumentException ex) {
            logger.debug(ex.getMessage());
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public Schedule findById(int scheduleId) throws SQLException, ServiceException {
        try {
            return scheduleDao.findById(scheduleId);
        } catch (IllegalArgumentException ex) {
            logger.debug(ex.getMessage());
            throw new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public void updateSchedule(int scheduleId, String title, int length, ScheduleType scheduleType) throws SQLException, ServiceException {
        try {
            scheduleDao.update(scheduleId,title,length,scheduleType);
        } catch (IllegalArgumentException ex) {
            logger.debug(ex.getMessage());
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
            logger.debug(ex.getMessage());
            throw  new ServiceException(ex.getMessage());
        }
    }
    
    @Override
    public List<Schedule> findAllByPublic(ScheduleType scheduleType) throws SQLException, ServiceException {
        try {
            return scheduleDao.findAllByPublic(scheduleType);
        }   catch (IllegalArgumentException ex) {
            logger.debug(ex.getMessage());
            throw  new ServiceException(ex.getMessage());
        }
    }
}
