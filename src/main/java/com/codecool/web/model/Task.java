package com.codecool.web.model;

public class Task extends AbstractModel {
    
    private int userId;
    private String title;
    
    public Task(int id, int userId, String title) {
        super(id);
        this.userId = userId;
        this.title = title;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public String getTitle() {
        return title;
    }
}
