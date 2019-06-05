package com.codecool.web.servlet;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/protected/logout")
public class LogoutServlet extends AbstractServlet{
    
    private static final Logger logger = LoggerFactory.getLogger(LoginServlet.class);
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        req.getSession().invalidate();
        resp.setStatus(HttpServletResponse.SC_OK);
        logger.info("User logged out");
        }
}
