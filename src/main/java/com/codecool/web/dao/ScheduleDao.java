package com.codecool.web.dao;

import com.codecool.web.model.Schedule;
import com.codecool.web.model.enums.ScheduleType;

import java.sql.SQLException;
import java.util.List;

public interface ScheduleDao {

    List<Schedule> findAll() throws SQLException;
    
    Schedule findById(int schedule_id) throws SQLException;
    
    Schedule add(int userId, String title, int length,ScheduleType scheduleType) throws SQLException;
    
    void update(int scheduleId, String title, int length,ScheduleType scheduleType) throws SQLException;
    
    void delete(int scheduleId) throws SQLException;
    
    List<Schedule> findAllByUserId(int userId) throws SQLException;
    
    List<Schedule> findAllByPublic(ScheduleType scheduleType) throws  SQLException;
    
}
