package com.codecool.web.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/log")
public class LogServlet extends AbstractServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String catalina = System.getProperty("catalina.home");
        req.getRequestDispatcher("/home/bence/apache-tomcat-8.5.40/logs/SM2000.html").forward(req,resp);
    }
}
