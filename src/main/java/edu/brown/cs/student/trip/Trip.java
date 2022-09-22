package edu.brown.cs.student.trip;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Set;

import java.util.List;

import edu.brown.cs.student.driver.Driver;
import edu.brown.cs.student.map.Node;
import edu.brown.cs.student.rider.Rider;

public class Trip {

  private String token = null;
  private Integer capacity = null;
  private Node origin = null;
  private Node destination = null;
  private Driver driver = null;
  private Set<Rider> riders = null;
  private Integer available = null;
  private LocalDate departureDate = null;
  private Double maxDetourMileage = null;
  private List<String> stops = new ArrayList<>();
  private List<Double> distances = new ArrayList<>();
  
  private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d");

  /**
   * 
   * @param token
   * @param driver
   * @param name
   * @param capacity
   * @param origin
   * @param destination
   * @param date - format : "2017/08/07", "2017/8/7"
   */
  public Trip(String token, Driver driver, Integer capacity, 
      Node origin, Node destination, String date, Double maxDetourMileage) {
    this.token = token;
    this.capacity = capacity;
    this.available = this.capacity;
    this.origin = origin;
    this.destination = destination;
    this.driver = driver;
    this.departureDate = LocalDate.parse(date, formatter);
    this.maxDetourMileage = maxDetourMileage;
  }
  
  public Trip(String token, Driver driver, Integer capacity, Integer available,
	      Node origin, Node destination, Set<Rider> riders,
	      String date, Double maxDetourMileage, 
	      List<String> stops, List<Double> distances) {
	    this.token = token;
	    this.capacity = capacity;
	    this.available =available;
	    this.origin = origin;
	    this.destination = destination;
	    this.driver = driver;
	    this.riders = riders;
	    this.departureDate = LocalDate.parse(date, formatter);
	    this.maxDetourMileage = maxDetourMileage;
	    this.stops = stops;
	    this.distances = distances;
	  }
  
  

  public String getRiderTokens() {
	if (this.riders==null) {
		return "";
	}
	  
	  
    StringBuilder riders = new StringBuilder();
    for (Rider rider : this.getRiders()) {
      riders.append(rider.getToken());
      riders.append(", ");
    }
    return riders.toString().trim();
  }

  public Set<Rider> getRiders() {
    return riders;
  }

  public void setRiders(Set<Rider> riders) {
    this.riders = riders;
  }

  public Integer getAvailable() {
    return available;
  }

  public void setAvailable(Integer available) {
    this.available = available;
  }

  public LocalDate getDepartureDate() {
    return departureDate;
  }

  public void setDepartureDate(LocalDate departureDate) {
    this.departureDate = departureDate;
  }

  public void addRiderLogiaclly(Rider rider) {
    assert(this.available != 0);
    riders.add(rider);
    this.available--;
  }

  public void removeRiderLogically(Rider rider) {
    riders.remove(rider);
    this.available++;
  }

  public Driver getDriver() {
    return this.driver;
  }

  public void setDriver(Driver driver) {
    this.driver = driver;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public Integer getCapacity() {
    return capacity;
  }

  public void setCapacity(Integer capacity) {
    this.capacity = capacity;
  }

  public Node getOrigin() {
    return origin;
  }

  public void setOrigin(Node origin) {
    this.origin = origin;
  }

  public Node getDestination() {
    return destination;
  }

  public void setDestination(Node destination) {
    this.destination = destination;
  }
  
  public List<String> getStops() {
	  return this.stops;
  }
  
  public void setStops(List<String> stops) {
	  this.stops = stops;
  }
  
  public List<Double> getDistances() {
	  return this.distances;
  }
  
  public List<String> getStringDistances() {
	  List<String> strings = new ArrayList<String>();
	  for (Double d : this.distances) {
	      strings.add(d.toString());
	  }
	  return strings;
  }
  
  
  public void setDistances(List<Double> distances) {
	  assert(this.stops.size() == distances.size()-1);
	  this.distances = distances;
  }
  
  public Double getMaxDetour() {
	  return this.maxDetourMileage;
  }
  
  public void setMaxDetour(Double maxDetour) {
	  this.maxDetourMileage = maxDetour;
  }
  
  @Override
  public int hashCode() {
	  return this.token.hashCode();
 
  }
  
  @Override 
  public boolean equals(Object obj) {
	    if (this == obj) {
	      return true;
	    }
	    if (obj == null) {
	      return false;
	    }
	    if (getClass() != obj.getClass()) {
	      return false;
	    }
	    Trip other = (Trip) obj;
	    return other.getToken().equals(this.token);
	  }
  
  
}
