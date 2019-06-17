package com.codecool.web.servlet;

import com.codecool.web.dao.TaskDao;
import com.codecool.web.dao.database.DatabaseTaskDao;
import com.codecool.web.service.TaskService;
import com.codecool.web.service.exception.ServiceException;
import com.codecool.web.service.simple.SimpleTaskSerive;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public class TaskDeleteServlet extends AbstractServlet{

    private static final Logger logger = LoggerFactory.getLogger(TaskDeleteServlet.class);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try(Connection connection = getConnection(req.getServletContext())){
            TaskDao taskDao = new DatabaseTaskDao(connection);
            TaskService taskService = new SimpleTaskSerive(taskDao);
            Integer taskId = Integer.valueOf(req.getParameter("taskId"));
            taskService.deleteTask(taskId);
            sendMessage(resp, HttpServletResponse.SC_OK,taskId);
        }catch (SQLException ex){
            logger.debug(ex.getMessage());
            sendMessage(resp, HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            ex.printStackTrace();
        }catch (ServiceException ex ){
            logger.debug(ex.getMessage());
            sendMessage(resp, HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            ex.getMessage();
        }
    }
}
