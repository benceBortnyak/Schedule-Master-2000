package com.codecool.web.service;

import com.codecool.web.model.Schedule;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public interface ScheduleService {
    
    void addSchedule(int userId, String title, int length) throws SQLException, ServiceException;
    
    List<Schedule> viewSchedules() throws SQLException, ServiceException; //type=public
    
    Schedule updateSchedule(int userId, String title, int length) throws SQLException, ServiceException;
    
    Schedule deleteSchedule(int userId, String title, int length) throws SQLException, ServiceException;
}
