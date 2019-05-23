package com.codecool.web.model;

public class Task extends AbstractModel {
    
    private int userId;
    private String title;
    private String content;
    
    public Task(int id, int userId, String title, String content) {
        super(id);
        this.userId = userId;
        this.title = title;
        this.content = content;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public String getTitle() {
        return title;
    }
    
    
    public String getContent() {
        return content;
    }
}
