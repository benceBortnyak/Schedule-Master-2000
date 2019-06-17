package com.codecool.web.servlet;

import com.codecool.web.dao.ScheduleDao;
import com.codecool.web.dao.database.DatabaseScheduleDao;
import com.codecool.web.model.Schedule;
import com.codecool.web.model.User;
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
@WebServlet("/update_schedule")
public class ScheduleUpdateServlet extends AbstractServlet {
    private static final Logger logger = LoggerFactory.getLogger(ScheduleUpdateServlet.class);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        try(Connection connection = getConnection(req.getServletContext())){
            ScheduleDao scheduleDao = new DatabaseScheduleDao(connection);
            ScheduleService scheduleService = new SimpleScheduleService(scheduleDao);
            int scheduleId = Integer.valueOf(req.getParameter("scheduleId"));
            String title = req.getParameter("title");
            int length = Integer.valueOf(req.getParameter("length"));
            ScheduleType scheduleType = ScheduleType.valueOf(req.getParameter("scheduleType"));
            scheduleService.updateSchedule(scheduleId,title,length,scheduleType);
            User user = (User) req.getSession().getAttribute("user");
            int userId = user.getId();
            sendMessage(resp, HttpServletResponse.SC_OK,new Schedule(scheduleId,userId,title,length,scheduleType));
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
