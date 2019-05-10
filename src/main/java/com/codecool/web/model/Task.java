package com.codecool.web.model;

public class Task {

    private Integer task_id;
    private int user_id;
    private String title;

    public Task(int user_id, String title) {
        this.task_id = null;
        this.user_id = user_id;
        this.title = title;
    }

    public Task(Integer task_id, int user_id, String title) {
        this.task_id = task_id;
        this.user_id = user_id;
        this.title = title;
    }
}
