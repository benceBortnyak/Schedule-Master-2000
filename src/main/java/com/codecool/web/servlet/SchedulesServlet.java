package com.codecool.web.servlet;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.dao.database.DatabaseScheduleDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.model.enums.ScheduleType;
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
import java.util.List;

@WebServlet("/schedules")
public class SchedulesServlet extends AbstractServlet {
    
    private static final Logger logger = LoggerFactory.getLogger(LoginServlet.class);
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        try (Connection connection = getConnection(req.getServletContext())) {
            ScheduleDao scheduleDao = new DatabaseScheduleDao(connection);
            ScheduleService scheduleService = new SimpleScheduleService(scheduleDao);
            int id = Integer.parseInt(req.getParameter("id"));
            List<Schedule> scheduleList = scheduleService.findAllByUserId(id);
            sendMessage(resp,HttpServletResponse.SC_OK, scheduleList);
        } catch (SQLException e) {
            logger.debug(e.getMessage());
            e.printStackTrace();
        } catch (ServiceException e) {
            logger.debug(e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        try (Connection connection = getConnection(req.getServletContext())) {
            ScheduleDao scheduleDao = new DatabaseScheduleDao(connection);
            ScheduleService scheduleService = new SimpleScheduleService(scheduleDao);
            String title = req.getParameter("title");
            int length = Integer.parseInt(req.getParameter("length"));
            int id = Integer.parseInt(req.getParameter("id"));
            ScheduleType type = ScheduleType.valueOf(req.getParameter("type"));
            Schedule schedule = scheduleService.addSchedule(id, title, length, type);
            sendMessage(resp,HttpServletResponse.SC_OK, schedule);
            logger.info("Schedule with id: "+ id +" added as: " + title);
        } catch (SQLException e) {
            logger.debug(e.getMessage());
            e.printStackTrace();
        } catch (ServiceException e) {
            logger.debug(e.getMessage());
            e.printStackTrace();
        }
    }
}
