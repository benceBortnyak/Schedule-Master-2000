package com.codecool.web.model;

public class Log {
    private String date;
    private String root;
    private String level;
    private String origin;
    private String message;

    public Log(String date, String root, String level, String origin, String message) {
        this.date = date;
        this.root = root;
        this.level = level;
        this.origin = origin;
        this.message = message;
    }

    public String getDate() {
        return date;
    }

    public String getRoot() {
        return root;
    }

    public String getLevel() {
        return level;
    }

    public String getOrigin() {
        return origin;
    }

    public String getMessage() {
        return message;
    }
}
