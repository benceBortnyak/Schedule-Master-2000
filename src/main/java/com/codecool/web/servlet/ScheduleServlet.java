package com.codecool.web.servlet;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.dao.database.DatabaseScheduleDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.service.ScheduleService;
import com.codecool.web.service.exception.ServiceException;
import com.codecool.web.service.simple.SimpleScheduleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet("/schedule")
public class ScheduleServlet extends AbstractServlet {

    private static final Logger logger = LoggerFactory.getLogger(ScheduleServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        try (Connection connection = getConnection(req.getServletContext())) {
            ScheduleDao scheduleDao = new DatabaseScheduleDao(connection);
            ScheduleService scheduleService = new SimpleScheduleService(scheduleDao);
            int id = Integer.parseInt(req.getParameter("id"));
            Schedule schedule = scheduleService.findById(id);
            sendMessage(resp, HttpServletResponse.SC_OK, schedule);
            logger.info("Schedule found and sent");
        } catch (SQLException e) {
            logger.debug(e.getMessage());
            e.printStackTrace();
        } catch (ServiceException e) {
            logger.debug(e.getMessage());
            e.printStackTrace();
        }
    }
}
