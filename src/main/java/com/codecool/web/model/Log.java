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
}
