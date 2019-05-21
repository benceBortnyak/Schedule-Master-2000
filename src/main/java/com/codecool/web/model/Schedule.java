package com.codecool.web.model;

public class Schedule extends AbstractModel {
    
    private int userId;
    private String title;
    private int length;

    public Schedule(int id, int userId, String title, int length) {
        super(id);
        this.userId = userId;
        this.title = title;
        this.length = length;
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
}
