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

@WebServlet("/delete_schedule")
public class ScheduleDeleteServlet extends AbstractServlet {
    private static final Logger logger = LoggerFactory.getLogger(ScheduleDeleteServlet.class);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try(Connection connection = getConnection(req.getServletContext())){
            ScheduleDao scheduleDao = new DatabaseScheduleDao(connection);
            ScheduleService scheduleService = new SimpleScheduleService(scheduleDao);
            int scheduleId =Integer.valueOf(req.getParameter("id"));
            scheduleService.deleteSchedule(scheduleId);
            sendMessage(resp, HttpServletResponse.SC_OK,scheduleId);

        }catch (SQLException ex){
            logger.debug(ex.getMessage());
            sendMessage(resp, HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            ex.getMessage();
        }catch (ServiceException ex){
            logger.debug(ex.getMessage());
            sendMessage(resp, HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            ex.getMessage();
        }
    }
}
