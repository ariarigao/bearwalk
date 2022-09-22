package edu.brown.cs.student.rider;
import edu.brown.cs.student.person.Person;

public class Rider extends Person {
	
//	private double rating = Double.NaN;
	private float rating = 0;
	
	public Rider(String userName, String firstName, 
			String lastName, String address, 
			String gender, String phoneNumber, 
			String birthday, String email, String token) {
		
        super(token, userName,firstName, lastName,address,
        		gender, phoneNumber, birthday, email);
        
	}
	
	public Rider () {}
	
	public float getRating () {
		return this.rating;
	}
	
	  @Override
	  public int hashCode() {
		  return getToken().hashCode();
	 
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
		    Rider other = (Rider) obj;
		    return other.getToken().equals(getToken());
		  }
	
	
	
}
