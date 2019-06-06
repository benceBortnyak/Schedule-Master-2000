package com.codecool.web.servlet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.codecool.web.dao.UserDao;
import com.codecool.web.dao.database.DatabaseUserDao;
import com.codecool.web.model.User;
import com.codecool.web.service.UserService;
import com.codecool.web.service.exception.ServiceException;
import com.codecool.web.service.simple.SimpleUserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;



@WebServlet("/login")
public class LoginServlet extends AbstractServlet {
    
    private static final Logger logger = LoggerFactory.getLogger(LoginServlet.class);
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        try(Connection connection = getConnection(req.getServletContext())){
            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);
            User user = userService.loginUser(req.getParameter("email"),req.getParameter("password"));
            req.getSession().setAttribute("user", user);
            sendMessage(resp,HttpServletResponse.SC_OK, user);
            logger.info(user.getForename() +" logged in");
        }catch (SQLException e ){
            handleSqlError(resp, e);
        }catch (ServiceException e ){
            e.printStackTrace();
            sendMessage(resp,HttpServletResponse.SC_UNAUTHORIZED,e.getMessage());
        }
    }
}
