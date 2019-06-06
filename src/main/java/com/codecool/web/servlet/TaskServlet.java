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

@WebServlet("/task")
public class TaskServlet extends AbstractServlet {

    private static final Logger logger = LoggerFactory.getLogger(TaskServlet.class);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        try (Connection connection = getConnection(req.getServletContext())) {
            TaskDao taskDao = new DatabaseTaskDao(connection);
            TaskService taskService = new SimpleTaskSerive(taskDao);
            String title = req.getParameter("title");
            String content = req.getParameter("content");
            int slotId = Integer.parseInt(req.getParameter("cellId"));
            int len = Integer.parseInt(req.getParameter("len"));
            int user_id = Integer.parseInt(req.getParameter("user_id"));
            Task task = taskService.addTask(user_id, title, content);
            taskService.addToSlot(slotId, task.getId(), len);
            sendMessage(resp, HttpServletResponse.SC_OK, task);
            logger.info("Task added to slot");
        }catch (SQLException e){
            logger.debug(e.getMessage());
            e.printStackTrace();
        }catch (ServiceException e){
            logger.debug(e.getMessage());
            e.printStackTrace();
        }
    }
}
