package com.codecool.web.servlet;

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
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Collections;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@WebServlet("/GoogleSignIn")
public class GoogleSignInServlet extends AbstractServlet {
    
    JacksonFactory jsonFactory = new JacksonFactory();
    private static final Logger logger = LoggerFactory.getLogger(LoginServlet.class);
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList("178796968342-imq5f33i7be8gplqutr2fqib887qgjkn.apps.googleusercontent.com"))
                .build();
        
        try (Connection connection = getConnection(req.getServletContext())) {
            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);
            String idTokenString = req.getParameter("idtoken");
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                Payload payload = idToken.getPayload();
                // Get profile information from payload
                String email = payload.getEmail();
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");
                String psw = "";
                if(userService.emailVerify(email)){
                    User user = userService.loginUser(email,psw);
                    req.getSession().setAttribute("user", user);
                    sendMessage(resp, HttpServletResponse.SC_OK, user);
                    logger.info(givenName +" logged in");
                } else {
                    userService.addUser(givenName,familyName,email,psw);
                    User user = userService.loginUser(email,psw);
                    req.getSession().setAttribute("user", user);
                    sendMessage(resp, HttpServletResponse.SC_OK, user);
                    logger.info(givenName +" logged in");
                }
            } else {
                System.out.println("Invalid ID token.");
            }
        } catch (GeneralSecurityException ex) {
            sendMessage(resp, HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
        } catch (ServiceException ex) {
            sendMessage(resp, HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
        } catch (SQLException ex) {
            handleSqlError(resp, ex);
        }
    }
}
