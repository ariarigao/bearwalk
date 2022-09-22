package edu.brown.cs.student.map;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import edu.brown.cs.student.pathfinder.Vertex;

public class Node implements Vertex<Node, Way> {

  private String id;
  private Double latitude;
  private Double longitude;
  private Map<NodePair, Set<NodeDist>> forwardMap;
  private Map<NodePair, Set<NodeDist>> backwardMap;
  private Way bestIncoming = null;

  /**
   * @param id : unique id
   * @param latitude : lat pos
   * @param longitude : lon pos
   */
  public Node(String id, double latitude, double longitude) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    forwardMap = new HashMap<NodePair, Set<NodeDist>>();
    backwardMap = new HashMap<NodePair, Set<NodeDist>>();
  }
  
  public Node(String id, double latitude, double longitude, 
		  Map<NodePair, Set<NodeDist>> forwardMap, 
		  Map<NodePair, Set<NodeDist>> backwardMap) {
	  this.id = id;
	  this.latitude = latitude;
	  this.longitude = longitude;
	  this.forwardMap = forwardMap;
	  this.backwardMap = backwardMap;
	  
	  
  }
  
  /**
   * @return trips that have this node in forward search space
   */
  public Map<NodePair, Set<NodeDist>> getForwardMap() {
	  return this.forwardMap;
  }
  
  /**
   * Set the forward set of this node
   * @param forwardSet forward set of trips
   */
  public void setForwardMap(Map<NodePair, Set<NodeDist>> forwardMap) {
	  this.forwardMap = forwardMap;
  }
  
  public void insertIntoForwardMap(NodePair nodePair, NodeDist nodeDist) {
	  if (this.forwardMap.containsKey(nodePair)) {
		  this.forwardMap.get(nodePair).add(nodeDist);
	  } else {
		  Set<NodeDist> set = new HashSet<>();
		  set.add(nodeDist);
		  
		  this.forwardMap.put(nodePair,set);
	  }	  
  }
  
  

  /**
   * @return trips that have this node in backward search space
   */
  public Map<NodePair, Set<NodeDist>> getBackwardMap() {
	  return this.backwardMap;
  }
  
  /**
   * Set the backward set of this node
   * @param forwardSet forward set of trips
   */
  public void setBackwardMap(Map<NodePair, Set<NodeDist>> backwardMap) {
	  this.backwardMap = backwardMap;
  }
  
  public void insertIntoBackwardMap(NodePair nodePair, NodeDist nodeDist) {
	  if (this.backwardMap.containsKey(nodePair)) {
		  this.backwardMap.get(nodePair).add(nodeDist);
	  } else {
		  Set<NodeDist> set = new HashSet<>();
		  set.add(nodeDist);
		  
		  this.backwardMap.put(nodePair,set);
	  }	  
  }
  
  
  
  
  
  /**
   * @return latitude
   */
  public double getLatitude() {
    return this.latitude;
  }
  /**
   * @return longitude
   */
  public double getLongitude() {
    return this.longitude;
  }
  /**
   * @return id
   */
  @Override
  public String getID() {
    return this.id;
  }

  @Override
  public Set<Way> getForwardNeighbors() {
    return null;
  }

  @Override
  public Set<Way> getBackwardNeighbors() {
    return null;
  }

@Override
public Way getBestIncoming() {
	return this.bestIncoming;
}

@Override
public void setBestIncoming(Way edge) {
	this.bestIncoming = edge;
	
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
	    Node other = (Node) obj;
	    return other.getID().equals(this.id);
	  }
  
}
