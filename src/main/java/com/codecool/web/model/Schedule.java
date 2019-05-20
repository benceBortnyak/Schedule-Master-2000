package com.codecool.web.model;

public class Schedule {
    private Integer scheduleId;
    private int userId;
    private String title;
    private int length;

    public Schedule(int userId, String title, int days_) {
        this.scheduleId = null;
        this.userId = userId;
        this.title = title;
        this.length = length;
    }

    public Schedule(Integer scheduleId, int userId, String title, int length) {
        this.scheduleId = scheduleId;
        this.userId = userId;
        this.title = title;
        this.length = length;
    }
}
