package com.codecool.web.servlet;


import com.codecool.web.dao.TaskDao;
import com.codecool.web.dao.database.DatabaseTaskDao;
import com.codecool.web.model.Task;
import com.codecool.web.service.TaskService;
import com.codecool.web.service.exception.ServiceException;
import com.codecool.web.service.simple.SimpleTaskSerive;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/tasks")
public class TasksServlet extends AbstractServlet {

    private static final Logger logger = LoggerFactory.getLogger(TasksServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        try(Connection connection = getConnection(req.getServletContext())){
            TaskDao taskDao = new DatabaseTaskDao(connection);
            TaskService taskService = new SimpleTaskSerive(taskDao);
            int id = Integer.parseInt(req.getParameter("id"));
            List<Task> taskList = taskService.findAllByScheduleId(id);
            System.out.println(taskList);
            sendMessage(resp,HttpServletResponse.SC_OK, taskList);
            logger.info("Tasks sent");
        }catch (SQLException e){
            logger.debug(e.getMessage());
            e.printStackTrace();
        }catch (ServiceException e){
            logger.debug(e.getMessage());
            e.printStackTrace();
        }
    }
}
