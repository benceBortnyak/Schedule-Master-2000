package com.codecool.web.servlet;

import com.codecool.web.dto.MessageDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

abstract class AbstractServlet extends HttpServlet {

    private final ObjectMapper om = new ObjectMapper();

    Connection getConnection(ServletContext sce) throws SQLException {
        DataSource dataSource = (DataSource) sce.getAttribute("dataSource");
        return dataSource.getConnection();
    }
    void sendMessage(HttpServletResponse resp, int status, String message) throws IOException {
        sendMessage(resp, status, new MessageDto(message));
    }

    void sendMessage(HttpServletResponse resp, int status, Object object) throws IOException {
        resp.setStatus(status);
        om.writeValue(resp.getOutputStream(), object);
    }

    void handleSqlError(HttpServletResponse resp, SQLException ex) throws IOException {
        sendMessage(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
        ex.printStackTrace();
    }
}
