package edu.brown.cs.student.map;

import edu.brown.cs.student.pathfinder.Edge;

public class Way implements Edge<Node, Way> {

  private String id;
  private Node start;
  private Node end;
  private Double weight;
  private String type;

  /**
   * @param id - unique id
   * @param start vertex
   * @param end vertex
   */
  public Way(String id, Node start, Node end) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.weight = this.findWeight();
    this.type = "";
  }
  
  public Way(String id, String type,Node start, Node end) {
	    this.id = id;
	    this.start = start;
	    this.end = end;
	    this.weight = this.findWeight();
	    this.type = type;
	  }
  
  

  /**
   * @return weight of way
   */
  private Double findWeight() {
	if ((this.start==null) || (this.end==null)) {
		return Double.MAX_VALUE;
	}
	  
	  
	
    final double earthRadius = 6371.0;
    double lat1 = this.start.getLatitude();
    double lat2 = this.end.getLatitude();
    double lon1 = this.start.getLongitude();
    double lon2 = this.end.getLongitude();
    
    
    double latDif = Math.toRadians(lat2 - lat1);
    double lonDif = Math.toRadians(lon2 - lon1);
    lat1 = Math.toRadians(lat1);
    lat2 = Math.toRadians(lat2);
    double h = Math.sqrt(Math.cos(lat1) *  Math.cos(lat2)
        * Math.pow(Math.sin(lonDif / 2), 2)
        + Math.pow(Math.sin(latDif / 2), 2));
    Double ans = earthRadius * Math.asin(h) * 2;
    return ans;
  }
  
  
  public String getType() {
	  return this.type;
  }
  
  public void setType(String type) {
	  this.type = type;
  }
  
  
  /**
   * @return weight of way
   */
  @Override
  public Double getWeight() {
    return this.weight;
  }

  @Override
  public String getID() {
    return this.id;
  }

  @Override
  public Node getSource() {
    return this.start;
  }

  @Override
  public Node getDestination() {
    return this.end;
  }

  @Override
  public void setWeight(Double weight) {
    this.weight = weight;
  }
  
  @Override
  public int hashCode() {
	  return this.id.hashCode();
 
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
	    Way other = (Way) obj;
	    return other.getID().equals(this.id);
	  }
}
