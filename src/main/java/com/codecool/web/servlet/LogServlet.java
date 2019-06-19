package com.codecool.web.servlet;

import com.codecool.web.model.Log;

import com.codecool.web.service.ReadLogService;
import com.codecool.web.service.exception.ServiceException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/log")
public class LogServlet extends AbstractServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ReadLogService readLogService = new ReadLogService();
        List<Log> logList = new ArrayList<>();
        try {
            logList = readLogService.LogReader();
        }catch (IOException e){
            e.getMessage();
        }
        sendMessage(resp, HttpServletResponse.SC_OK,logList);
    }
}
