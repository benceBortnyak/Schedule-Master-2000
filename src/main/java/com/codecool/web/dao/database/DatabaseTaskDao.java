package com.codecool.web.dao.database;

import com.codecool.web.dao.TaskDao;
import com.codecool.web.model.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseTaskDao extends AbstractDao implements TaskDao {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseTaskDao.class);
    
    public DatabaseTaskDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Task> findAllByScheduleId(int scheduleId) throws SQLException {
        
        List<Task> taskList = new ArrayList<>();
        String sqlString = "SELECT t.task_id, t.user_id, t.title, t.content, sche.schedule_id " +
                "FROM schedules AS sche " +
                "JOIN columns AS c ON c.schedule_id = sche.schedule_id " +
                "JOIN slots AS s ON s.column_id = c.column_id " +
                "JOIN slots_tasks AS st ON st.slot_id = s.slot_id " +
                "JOIN tasks AS t ON t.task_id = st.task_id " +
                "WHERE sche.schedule_id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setInt(1, scheduleId);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    taskList.add(fetchTask(resultSet));
                }
            }
        }
        logger.info("Task list returned");
        return taskList;
    }
    
    @Override
    public Task findById(int taskId) throws SQLException {
        
        String sqlString = "SELECT task_id,user_id,title,content FROM tasks WHERE task_id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString)) {
            preparedStatement.setInt(1, taskId);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    return fetchTask(resultSet);
                }
            }
        }
        logger.info("Task not found(by id)");
        return null;
    }
    
    @Override
    public Task add(int userId, String title, String content) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlString = "INSERT INTO tasks (user_id, title, content) VALUES (?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sqlString, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setInt(1, userId);
            preparedStatement.setString(2, title);
            preparedStatement.setString(3, content);
            executeInsert(preparedStatement);
            int id = fetchGeneratedId(preparedStatement);
            logger.debug("Task added");
            return new Task(id, userId, title, content);
        } catch (SQLException ex) {
            logger.debug(ex.getMessage());
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }
    
    @Override
    public void addToSlot(int slotId,int taskId) throws SQLException{
        
        boolean autoCommit= connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlString = "UPDATE slots_tasks SET task_id = ? WHERE slot_id = ?";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sqlString)){
            preparedStatement.setInt(1,taskId);
            preparedStatement.setInt(2,slotId);
            preparedStatement.executeUpdate();
            logger.info("Task added to slot");
        }catch (SQLException ex){
            logger.debug(ex.getMessage());
            connection.rollback();
            throw ex;
        }finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    @Override
    public void deleteTask(int taskId) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlString = "UPDATE slots_tasks set task_id = null where task_id = ?";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sqlString)){
            preparedStatement.setInt(1,taskId);
            preparedStatement.executeUpdate();
            logger.info("Task deleted");
        }catch (SQLException e ){
            logger.debug(e.getMessage());
            connection.rollback();
            throw e;
        }finally {
            connection.setAutoCommit(autoCommit);
        }

    }
    @Override
    public void updateTask(int taskId, String title, String content) throws SQLException{
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sqlStatement = "UPDATE tasks SET title =?, content=? WHERE task_id =?";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sqlStatement)){
            preparedStatement.setString(1,title);
            preparedStatement.setString(2,content);
            preparedStatement.setInt(3,taskId);
            preparedStatement.executeUpdate();
            logger.info("Task updated");
        }catch (SQLException e ){
            logger.debug(e.getMessage());
            connection.rollback();
            throw e;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    @Override
    public List<Task> findAll() throws SQLException {
        List<Task> taskList = new ArrayList<>();
        String sqlStatement = "SELECT * FROM tasks";
        try(PreparedStatement preparedStatement = connection.prepareStatement(sqlStatement)){
            try (ResultSet resultSet= preparedStatement.executeQuery()){
                while (resultSet.next()){
                    taskList.add(fetchTask(resultSet));
                }
            }
        }
        catch (SQLException e ){
            logger.debug(e.getMessage());
                connection.rollback();
        }
        logger.info("Tasks returned");
        return taskList;
    }
    
    private Task fetchTask(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("id");
        int userId = resultSet.getInt("user_id");
        String title = resultSet.getString("title");
        String content = resultSet.getString("content");
        logger.info("New task created");
        return new Task(id, userId, title, content);
    }
}
