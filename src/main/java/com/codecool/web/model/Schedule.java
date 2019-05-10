package com.codecool.web.model;

public class Schedule {
    private Integer schedule_id;
    private int user_id;
    private String title;
    private int days_;

    public Schedule(int user_id, String title, int days_) {
        this.schedule_id = null;
        this.user_id = user_id;
        this.title = title;
        this.days_ = days_;
    }

    public Schedule(Integer schedule_id, int user_id, String title, int days_) {
        this.schedule_id = schedule_id;
        this.user_id = user_id;
        this.title = title;
        this.days_ = days_;
    }
}
