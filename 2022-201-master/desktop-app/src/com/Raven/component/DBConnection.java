/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.raven.connection;

import com.mysql.jdbc.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author LENOVO
 */
public class DBConnection {
    
    private static DBConnection instance;
    private Connection connection;

    public static DBConnection getInstance() {
        if (instance == null) {
            instance = new DBConnection();
        }
        return instance;
    }

    private DBConnection() {

    }

    public void connectToDatabase() throws SQLException {
        try {
            String dbURL = "jdbc:mysql://localhost:3306/complexity_tool";
            String username = "root";
            String password = "";
            Class.forName("com.mysql.jdbc.Driver");
            connection = (Connection) DriverManager.getConnection(dbURL, username, password);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DBConnection.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Connection getConnection() {
        return connection;
        
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }
}
