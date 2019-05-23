package com.codecool.web.model;

import com.codecool.web.model.enums.ScheduleType;

public class Schedule extends AbstractModel {
    
    private int userId;
    private String title;
    private int length;
    private ScheduleType scheduleType;

    public Schedule(int id, int userId, String title, int length,ScheduleType scheduleType) {
        super(id);
        this.userId = userId;
        this.title = title;
        this.length = length;
        this.scheduleType = scheduleType;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public int getLength() {
        return length;
    }
    
    public ScheduleType getScheduleType() {
        return scheduleType;
    }
}
