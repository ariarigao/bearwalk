package edu.brown.cs.student.map;

public class NodePair {
	
	private Node origin;
	private Node destination;
	public NodePair(Node origin, Node destination) {
		this.origin = origin;
		this.destination = destination;
	}
	
	public Node getOrigin() {
		return this.origin;
		
	}
	
	public Node getDestination() {
		return this.destination;
	}
	
	public void setOrigin(Node origin) {
		this.origin = origin;
	}
	
	public void setDestination(Node destination) {
		this.destination = destination;
	}
	
	@Override
	public int hashCode() {
		return this.origin.hashCode() + 31*this.destination.hashCode();

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
		    NodePair other = (NodePair) obj;
		    return (other.getOrigin().equals(this.origin) && 
		    		other.getDestination().equals(this.destination));
		  }
	

}
