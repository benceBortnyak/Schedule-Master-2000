package com.codecool.web.dao;

import com.codecool.web.model.Schedule;

import java.sql.SQLException;
import java.util.List;

public interface ScheduleDao {

    List<Schedule> findAll() throws SQLException;
    
    Schedule findById(int schedule_id) throws SQLException;
    
    Schedule add(int userId, String title, int length) throws SQLException;
}
