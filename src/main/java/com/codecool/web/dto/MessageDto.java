package com.codecool.web.dto;

public final class MessageDto {

    private final String message;

    public MessageDto(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
