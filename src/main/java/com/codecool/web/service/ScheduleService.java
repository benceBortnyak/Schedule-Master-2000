package com.codecool.web.service;

import com.codecool.web.model.Schedule;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public interface ScheduleService {
    
    void addSchedule(int userId, String title, int length) throws SQLException, ServiceException;
    
    List<Schedule> findAll() throws SQLException, ServiceException;
    
    void updateSchedule(int scheduleId, String title, int length) throws SQLException, ServiceException;
    
    void deleteSchedule(int scheduleId) throws SQLException, ServiceException;
    
    Schedule findById(int scheduleId) throws SQLException, ServiceException;
    
    List<Schedule> findAllByUserId(int userId) throws SQLException, ServiceException;
}
