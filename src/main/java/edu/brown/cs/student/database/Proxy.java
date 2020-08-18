package edu.brown.cs.student.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import edu.brown.cs.student.driver.Driver;
import edu.brown.cs.student.map.Node;
import edu.brown.cs.student.map.Way;
import edu.brown.cs.student.rider.Rider;
import edu.brown.cs.student.trip.Trip;

public final class Proxy {


  // snippet-sourcedescription:[ConnectToClusterExample demonstrates how to 
  // connect to an Amazon Redshift cluster and run a sample query.]
  // snippet-service:[redshift]
  // snippet-keyword:[Java]
  // snippet-keyword:[Amazon Redshift]
  // snippet-keyword:[Code Sample]
  // snippet-keyword:[Connect]
  // snippet-keyword:[JDBC]
  // snippet-sourcetype:[full-example]
  // snippet-sourcedate:[2019-02-01]
  // snippet-sourceauthor:[AWS]
  // snippet-start:[redshift.java.ConnectToCluster.complete]

  //Redshift driver: "jdbc:redshift://x.y.us-west-2.redshift.amazonaws.com:5439/dev";
  static final String dbURL = "jdbc:redshift://hopp-db.c0wipsh0sggr.us-east-2.redshift.amazonaws.com:5440/hopp";
  static final String MasterUsername = "hsingh574";
  static final String MasterUserPassword = "Hopp1234!";
  private static Connection conn = null;
  private static Statement stmt = null;
  private static PreparedStatement prep = null;

  //  public Proxy() {

  //  Properties props = new Properties();
  //
  //  //Uncomment the following line if using a keystore.
  //  //props.setProperty("ssl", "true");
  //  props.setProperty("user", MasterUsername);
  //  props.setProperty("password", MasterUserPassword);
  //  try {
  //    this.conn = DriverManager.getConnection(dbURL, props);
  //  } catch (SQLException e) {
  //    e.printStackTrace();
  //  }
  //    
  //  }

  public void doOnceFunction() {
    //    this.setUpRiderTable();
    //    this.setUpDriverTable();

    //  //Try a simple query.
    //    System.out.println("Listing system tables...");
    //    stmt = this.conn.createStatement();
    //    String sql;
    //    sql = "select * from information_schema.tables;";
    //    ResultSet rs = stmt.executeQuery(sql);
    //
    //    //Get the data from the result set.
    //    while(rs.next()){
    //      //Retrieve two columns.
    //      String catalog = rs.getString("table_catalog");
    //      String name = rs.getString("table_name");
    //
    //      //Display values.
    //      System.out.print(name + ", ");
    //    }
    //    
    ////     code to drop existing tables
    //    sql = "DROP TABLE IF EXISTS users";
    //    stmt.executeUpdate(sql);
    //    System.out.println("Listing system tables...");
    //    sql = "select * from information_schema.tables;";
    //    rs = stmt.executeQuery(sql);
    //    //Get the data from the result set.
    //    while(rs.next()){
    //      //Retrieve two columns.
    //      String catalog = rs.getString("table_catalog");
    //      String name = rs.getString("table_name");
    //      //Display values.
    //      System.out.print(name + ", ");
    //    }
    //    rs.close();
    //    stmt.close();
    //    conn.close();
  }

  public static void connect() {

    try{
      //Dynamically load driver at runtime.
      //Redshift JDBC 4.1 driver: com.amazon.redshift.jdbc41.Driver
      //Redshift JDBC 4 driver: com.amazon.redshift.jdbc4.Driver
      Class.forName("com.amazon.redshift.jdbc42.Driver");

      //Open a connection and define properties.
      System.out.println("Connecting to database...");

      Properties props = new Properties();

      //Uncomment the following line if using a keystore.
      props.setProperty("ssl", "true");
      props.setProperty("user", MasterUsername);
      props.setProperty("password", MasterUserPassword);
      try {
        conn = DriverManager.getConnection(dbURL, props);
      } catch (SQLException e) {
        e.printStackTrace();
      }
    } catch(Exception ex){
      //For convenience, handle all errors here.
      ex.printStackTrace();
    } 


    System.out.println("Finished connectivity test.");
  }

  public static void closeEverything() {
    //Finally block to close resources.
    try{
      if(stmt!=null)
        stmt.close();
    }catch(Exception ex){
    }// nothing we can do
    try{
      if(conn!=null)
        conn.close();
    }catch(Exception ex){
      ex.printStackTrace();
    }
  }

  public static void setUpRiderTable() {
    try {
      stmt = conn.createStatement();
      String sql;
      sql = "CREATE TABLE riders ("
          + "ID VARCHAR(30) NOT NULL, "
          + "USERNAME VARCHAR(30) NOT NULL, "
          + "FIRSTNAME VARCHAR(45) NOT NULL, "
          + "LASTNAME VARCHAR(45) NOT NULL, "
          + "ADDRESS VARCHAR(200) NOT NULL, "
          + "GENDER VARCHAR(45) NOT NULL, "
          + "PHONENUMBER VARCHAR(45) NOT NULL, "
          + "BIRTHDAY VARCHAR(45) NOT NULL, "
          + "EMAIL VARCHAR(45) NOT NULL, "
          + "RATING FLOAT, "
          + "PRIMARY KEY (ID));";
      stmt.executeUpdate(sql);
      System.out.println("Sucessfully created rider table.");
    } catch (Exception e) {
      e.printStackTrace();
    }	
  }


  public static void setUpDriverTable() {
    try {
      stmt = conn.createStatement();
      String sql;
      sql = "CREATE TABLE drivers ("
          + "ID VARCHAR(30) NOT NULL, "
          + "RATING FLOAT, "
          + "LICENSE VARCHAR(30) NOT NULL, "
          + "CAR VARCHAR(200) NOT NULL, "
          + "PRIMARY KEY (ID));";
      stmt.executeUpdate(sql);
    } catch (Exception e) {
      e.printStackTrace();
    }	
  }
  
  public static void setUpTripTable() {
	    try {
	      stmt = conn.createStatement();
	      String sql;
	      sql = "CREATE TABLE trips ("
	          + "ID VARCHAR(30) NOT NULL, "
	          + "DRIVER_ID VARCHAR(30) NOT NULL, "
	          + "ORIGIN VARCHAR(30) NOT NULL, "
	          + "DESTINATION VARCHAR(30) NOT NULL, "
	          + "CAPACITY INT NOT NULL, "
	          + "AVAILABLE INT NOT NULL, "
	          + "RIDERS VARCHAR(75), "
	          + "DEPARTURE_DATE DATE NOT NULL, "
	          + "MAX_DETOUR DOUBLE PRECISION NOT NULL, "
	          
	          + "STOPS VARCHAR(500) NOT NULL, "
	          + "DISTANCES VARCHAR(500) NOT NULL, "
	          
	          + "PRIMARY KEY (ID), FOREIGN KEY (DRIVER_ID) "
	          + "REFERENCES drivers(ID))";
	      stmt.executeUpdate(sql);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }   
	  }
  
  public static void setUpNodeTable() {
	    try {
	      stmt = conn.createStatement();
	      String sql;
	      sql = "CREATE TABLE node ("
	          + "ID VARCHAR(30) NOT NULL, "
	          + "LATITUDE DOUBLE PRECISION NOT NULL, "
	          + "LONGITUDE DOUBLE PRECISION NOT NULL, "

	          + "PRIMARY KEY (ID));";
	      stmt.executeUpdate(sql);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }   
	  }
  public static void setUpWayTable() {
	  try {
	      stmt = conn.createStatement();
	      String sql;
	      sql = "CREATE TABLE way ("
	          + "ID VARCHAR(100) NOT NULL, "
	          + "TYPE VARCHAR(30), "
	          + "STARTING VARCHAR(30) NOT NULL, "
	          + "ENDING VARCHAR(30) NOT NULL, "

	          + "PRIMARY KEY (ID),FOREIGN KEY (STARTING) "
	          + "REFERENCES node(ID),FOREIGN KEY (ENDING) "
	          + "REFERENCES node(ID));";
	      stmt.executeUpdate(sql);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }  
  }

  public static boolean checkExistsHelper(String query, String token) {
	  PreparedStatement prep;
	  ResultSet rs;
	  int output;
	  try {
		  prep = conn.prepareStatement(query);
	      prep.setString(1, token);
	      rs = prep.executeQuery();
	      while (rs.next()) {
	    	  output = rs.getInt(1);
	    	  return (output==1);  
	      }
	  } catch (SQLException e) {
	      e.printStackTrace();
	    }
	  return false;
  }
  
  
  /**Next four methods are for Rider Logic **/
  
  //insert rider that does not exist
  public static void insertRider(Rider rider) {
    String query = "INSERT INTO riders (ID, USERNAME, FIRSTNAME, LASTNAME, "
        + "ADDRESS, GENDER, PHONENUMBER, BIRTHDAY, EMAIL, RATING) " + 
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    try {
      prep = conn.prepareStatement(query);
      prep.setString(1, rider.getToken());
      prep.setString(2, rider.getUserName());
      prep.setString(3, rider.getFirstName());
      prep.setString(4, rider.getLastName());
      prep.setString(5, rider.getAddress());
      prep.setString(6, rider.getGender());
      prep.setString(7, rider.getPhoneNumber());
      prep.setString(8, rider.getBirthday());
      prep.setString(9, rider.getEmail());
      prep.setFloat(10, rider.getRating());
      prep.executeUpdate();
      System.out.println("Sucessfully inserted rider.");
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
  
  //update rider already in the databases
  public static void updateRider(Rider rider) {
	    String query = "UPDATE riders SET USERNAME=?, FIRSTNAME=?, LASTNAME=?, "
	        + "ADDRESS=?, GENDER=?, PHONENUMBER=?, BIRTHDAY=?, EMAIL=?, RATING=? "
	        + "where ID=?;";
	    try {
	      prep = conn.prepareStatement(query);
	      prep.setString(1, rider.getUserName());
	      prep.setString(2, rider.getFirstName());
	      prep.setString(3, rider.getLastName());
	      prep.setString(4, rider.getAddress());
	      prep.setString(5, rider.getGender());
	      prep.setString(6, rider.getPhoneNumber());
	      prep.setString(7, rider.getBirthday());
	      prep.setString(8, rider.getEmail());
	      prep.setFloat(9, rider.getRating());
	      prep.setString(10, rider.getToken());
	      prep.executeUpdate();
	      System.out.println("Sucessfully updated rider.");
	    } catch (SQLException e) {
	      e.printStackTrace();
	    }
	  }
  
  public static boolean checkRiderExists(String token) {
	  String query = "SELECT 1 FROM riders WHERE ID = ?;";
	  return checkExistsHelper(query, token);
  }

  public static Rider getRiderFromToken(String token) {
    String query = "SELECT * FROM riders WHERE ID = ?;";
    PreparedStatement prep;
    ResultSet rs;
    try {
      prep = conn.prepareStatement(query);
      prep.setString(1, token);
      rs = prep.executeQuery();
      while (rs.next()) {
        return new Rider(rs.getString("USERNAME"), rs.getString("FIRSTNAME"), 
        		rs.getString("LASTNAME"),rs.getString("ADDRESS"), 
        		rs.getString("GENDER"), rs.getString("PHONENUMBER"), 
        		rs.getString("BIRTHDAY"), rs.getString("EMAIL"), 
        		rs.getString("ID"));
      }
      rs.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return null;
  }
  
  
  /**Next four methods are for Driver Logic **/

  //insert driver not in database
  public static void insertDriver(Driver driver) {
    String query = "INSERT INTO drivers " + 
        "VALUES (?, ?, ?, ?);";
    PreparedStatement prep;
    try {
      prep = conn.prepareStatement(query);
      prep.setString(1, driver.getToken());
      prep.setDouble(2, driver.getRating());
      prep.setString(3, driver.getLicenseNumber());
      prep.setString(4, driver.getCarMakeandModel());
      prep.executeUpdate();
      System.out.println("Sucessfully inserted driver.");
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
  
  //update driver already in the database
  public static void updateDriver(Driver driver) {
	    String query = "UPDATE drivers SET RATING=?, LICENSE=?, "
	        + "CAR=? where ID=?;";
	    try {
	    	prep = conn.prepareStatement(query);
	        prep.setDouble(1, driver.getRating());
	        prep.setString(2, driver.getLicenseNumber());
	        prep.setString(3, driver.getCarMakeandModel());
	        prep.setString(4, driver.getToken());
	        prep.executeUpdate();
	      System.out.println("Sucessfully updated driver.");
	    } catch (SQLException e) {
	      e.printStackTrace();
	    }
	  }
  
  public static boolean checkDriverExists(String token) {
	  String query = "SELECT 1 FROM drivers WHERE ID = ?;";
	  return checkExistsHelper(query, token);
  }
  

  public static Driver getDriverFromToken(String token) {
    String query = "SELECT * FROM drivers WHERE ID = ?;";
    PreparedStatement prep;
    ResultSet rs;
    try {
      prep = conn.prepareStatement(query);
      prep.setString(1, token);
      rs = prep.executeQuery();
      String license = null;
      String car = null;
      Double rating = null;
      while (rs.next()) {
        license = rs.getString("LICENSE");
        car = rs.getString("CAR");
        rating = rs.getDouble("RATING");
      }
      if (license != null) {
    	  Rider r = getRiderFromToken(token);
    	  if (r != null) {
    		  return new Driver(r.getUserName(), 
    				  r.getFirstName(), r.getLastName(),
    		            r.getAddress(), r.getGender(), 
    		            r.getPhoneNumber(), 
    		            r.getBirthday(), r.getEmail(), 
    		            license, car, rating, token);
    	  }
      }
      rs.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return null;
  }

  
  /**Next four methods are for Trip Logic **/

  //insert trip not in database
  public static void insertTrip(Trip trip) {
    String query = "INSERT INTO trips " + 
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    PreparedStatement prep;
    try {
      prep = conn.prepareStatement(query);
      prep.setString(1, trip.getToken());
      prep.setString(2, trip.getDriver().getToken());
      prep.setString(3, trip.getOrigin().getID());
      prep.setString(4, trip.getDestination().getID());
      prep.setInt(5, trip.getCapacity());
      prep.setInt(6, trip.getAvailable());
      prep.setString(7, trip.getRiderTokens());
      prep.setDate(8, java.sql.Date.valueOf(trip.getDepartureDate()));
      prep.setDouble(9, trip.getMaxDetour());
      prep.setString(10, String.join(",",trip.getStops()));
      prep.setString(11, String.join(",",trip.getStringDistances()));
      prep.executeUpdate();
      System.out.println("Sucessfully inserted trip.");
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  //update trip already in the database
  public static void updateTrip(Trip trip) {
    String query = "UPDATE trips " + 
    			"SET DRIVER_ID=?,ORIGIN=?,DESTINATION=?, " +
    			"CAPACITY=?, AVAILABLE=?,RIDERS=?,DEPARTURE_DATE=?, " + 
    			"MAX_DETOUR=?,STOPS=?,DISTANCES=? " +
    			"WHERE ID = ?;";
    PreparedStatement prep;
    try {
      prep = conn.prepareStatement(query);
      
      prep.setString(1, trip.getDriver().getToken());
      prep.setString(2, trip.getOrigin().getID());
      prep.setString(3, trip.getDestination().getID());
      prep.setInt(4, trip.getCapacity());
      prep.setInt(5, trip.getAvailable());
      prep.setString(6, trip.getRiderTokens());
      prep.setDate(7, java.sql.Date.valueOf(trip.getDepartureDate()));
      prep.setDouble(8, trip.getMaxDetour());
      prep.setString(9, String.join(",",trip.getStops()));
      prep.setString(10, String.join(",",trip.getStringDistances()));
      prep.setString(11, trip.getToken());
      prep.executeUpdate();
      System.out.println("Sucessfully updated trip.");
      
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
  
  
  

  public static boolean checkTripExists(String token) {
	  String query = "SELECT 1 FROM trips WHERE ID = ?;";
	  return checkExistsHelper(query, token);
  }
  
  
  public static Trip getTripFromToken(String token) {

	    String query = "SELECT * FROM trips WHERE ID = ?;";
	    PreparedStatement prep;
	    ResultSet rs;
	    try {
	      prep = conn.prepareStatement(query);
	      prep.setString(1, token);
	      rs = prep.executeQuery();
	      while (rs.next()) {
	    	  String id = rs.getString("ID");
	    	  Driver driver = getDriverFromToken(rs.getString("DRIVER_ID"));
	    	  Node origin = getNodeFromToken(rs.getString("ORIGIN"));
	    	  Node destination = getNodeFromToken(rs.getString("DESTINATION"));

	    	  Integer capacity = rs.getInt("CAPACITY");
	    	  Integer available = rs.getInt("AVAILABLE");
	    	  Double maxDetour = rs.getDouble("MAX_DETOUR");
	    	  
	    	  String[] riderIDs = rs.getString("RIDERS").split(",");
	    	  Set<Rider> riders = new HashSet<>();
	    	  for (String r : riderIDs) {
	    		  riders.add(getRiderFromToken(r));
	    	  
	    	  }

	    	  String departureDate = rs.getString("DEPARTURE_DATE");
	    	  
	    	  String[] stopIDs = rs.getString("STOPS").split(",");
	    	  String[] stringDistances = rs.getString("DISTANCES").split(",");
	    	  
	    	  List<Double> distances = new ArrayList<>();
	    	  for (String sd : stringDistances) {
	    		  try {
	    		  distances.add(Double.parseDouble(sd));
	    		  } catch(NumberFormatException e) {
	    			  //empty string
	    		  }
	    		  
	    	  }
	    	  List<String> stops = Arrays.asList(stopIDs);
	    	 
	    	  return new Trip(id, driver, capacity, available, 
	    			  origin, destination, riders, departureDate, 
	    			  maxDetour, stops, distances);
	  
	      }
	      rs.close();
	    } catch (SQLException e) {
	      e.printStackTrace();
	    }
	    return null;
	  }
  
  
  /**Next four methods are for Node Logic **/
  
  
  //insert node not in database
  public static void insertNode(Node node) {
    String query = "INSERT INTO node " + 
        "VALUES (?, ?, ?);";
    PreparedStatement prep;
    try {
      prep = conn.prepareStatement(query);
      prep.setString(1, node.getID());
      prep.setDouble(2, node.getLatitude());
      prep.setDouble(3, node.getLongitude());
      
      prep.executeUpdate();
      System.out.println("Sucessfully inserted node.");
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  
  //update node already in the database
  public static void updateNode(Node node) {
	    String query = "UPDATE node SET LATITUDE=?, LONGITUDE=?, "
	    		+"where ID=?;";
	    PreparedStatement prep;
	    try {
	    	prep = conn.prepareStatement(query);
	    	
	        prep.setDouble(1, node.getLatitude());
	        prep.setDouble(2, node.getLongitude());
	        prep.setString(3, node.getID());
	        prep.executeUpdate();
	        System.out.println("Sucessfully updated node.");
	    } catch (SQLException e) {
	      e.printStackTrace();
	    }
	  }
  
  public static boolean checkNodeExists(String token) {
	  String query = "SELECT 1 FROM node WHERE ID = ?;";
	  return checkExistsHelper(query, token);
  }
  
  public static Node getNodeFromToken(String token) {
	  String query = "SELECT * FROM node WHERE ID = ?;";
	  PreparedStatement prep;
	  ResultSet rs;
	    try {
	      prep = conn.prepareStatement(query);
	      prep.setString(1, token);
	      rs = prep.executeQuery();
	      while (rs.next()) {
	    	  String id = rs.getString("ID");
	    	  Double latitude = rs.getDouble("LATITUDE");
	    	  Double longitude = rs.getDouble("LONGITUDE");
	    	  return new Node(id, latitude, longitude);
	      }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return null;
  }
  
  /**Next four methods are for Way Logic **/
  
  //insert node not in database
  public static void insertWay(Way way) {
    String query = "INSERT INTO way " + 
        "VALUES (?, ?, ?, ?);";
    PreparedStatement prep;
    try {
      prep = conn.prepareStatement(query);
      prep.setString(1, way.getID());
      prep.setString(2, way.getType());
      prep.setString(3, way.getSource().getID());
      prep.setString(4, way.getDestination().getID());
      prep.executeUpdate();
      System.out.println("Sucessfully inserted way.");
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  //update node already in the database
  public static void updateWay(Way way) {
	    String query = "UPDATE way SET TYPE=?, STARTING=?, "
	        + "ENDING=? where"
	        + " ID=?;";
	    PreparedStatement prep;
	    try {
	    	prep = conn.prepareStatement(query);
	        prep.setString(1, way.getType());
	        prep.setString(2, way.getSource().getID());
	        prep.setString(3, way.getDestination().getID());
	        prep.setString(4, way.getID());
	        prep.executeUpdate();
	        System.out.println("Sucessfully updated way.");
	    } catch (SQLException e) {
	      e.printStackTrace();
	    }
	  }
  
  public static boolean checkWayExists(String token) {
	  String query = "SELECT 1 FROM way WHERE ID = ?;";
	  return checkExistsHelper(query, token);
  }
  
  public static Way getWayFromToken(String token) {
	  String query = "SELECT * FROM way WHERE ID = ?;";
	  PreparedStatement prep;
	  ResultSet rs;
	    try {
	      prep = conn.prepareStatement(query);
	      prep.setString(1, token);
	      rs = prep.executeQuery();
	      while (rs.next()) {
	    	  String id = rs.getString("ID");
	    	  String type = rs.getString("TYPE");
	    	  Node start = getNodeFromToken(rs.getString("STARTING"));
	    	  Node end = getNodeFromToken(rs.getString("ENDING"));
	    	  return new Way(id, type,start, end);
	      }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return null;
  }
  
  
  
  
  
  
  
  
  
  
  
  /**
   * finds and creates the nearest node for incoming
   * lat/lon input from frontend
   * @param lat
   * @param lon
   * @return
   */
  
  
  /**
  public static Node findNearestNode(Double lat, Double lon) {
    String query = "SELECT id, latitude, lonitude, "
        + "POWER(POWER((latitude - ?), 2) + POWER((longitude - ?), 2), 1/2) as distance "
        + "FROM node SORT BY distance LIMIT 1;";
    try {
      PreparedStatement prep = conn.prepareStatement(query);
      prep.setDouble(1, lat);
      prep.setDouble(2, lon);
      ResultSet rs = prep.executeQuery();
      Double latitude = rs.getDouble("latitude");
      Double longitude = rs.getDouble("longitude");
      String id = rs.getString("id");
      rs.close();
      return new Node(id, latitude, longitude);
    } catch (SQLException e) {
      return null;
    }
  }
  
  
  **/
}

