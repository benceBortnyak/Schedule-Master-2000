package com.codecool.web.model;

public class Task extends AbstractModel {
    
    private int userId;
    private String title;
    private String taskType;
    private String content;
    
    public Task(int id, int userId, String title, String taskType, String content) {
        super(id);
        this.userId = userId;
        this.title = title;
        this.taskType = taskType;
        this.content = content;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public String getTaskType() {
        return taskType;
    }
    
    public String getContent() {
        return content;
    }
}
