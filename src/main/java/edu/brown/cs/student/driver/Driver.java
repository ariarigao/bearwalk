package edu.brown.cs.student.driver;
import edu.brown.cs.student.person.Person;

public class Driver extends Person {

  private double rating = Double.NaN;
  private String licenseNumber = "";
  private String carMakeandModel = "";

  public Driver(String userName, String firstName, 
      String lastName, String address, 
      String gender, String phoneNumber, 
      String birthday, String email, 
      String licenseNumber, String carMakeandModel, String token) {

    super(token, userName,firstName, lastName,address,
        gender, phoneNumber, birthday, email);
    this.licenseNumber = licenseNumber;
    this.carMakeandModel = carMakeandModel;
  }

  
  public Driver(String userName, String firstName, 
	      String lastName, String address, 
	      String gender, String phoneNumber, 
	      String birthday, String email, 
	      String licenseNumber, String carMakeandModel, Double rating, String token) {

	    super(token, userName,firstName, lastName,address,
	        gender, phoneNumber, birthday, email);
	    this.licenseNumber = licenseNumber;
	    this.carMakeandModel = carMakeandModel;
	    this.rating = rating;
	  }
  
  
  public Driver () {}

  public double getRating () {
    return this.rating;
  }
  public String getLicenseNumber() {
    return this.licenseNumber;
  }
  public String getCarMakeandModel () {
    return this.carMakeandModel;
  }

  public void setRating (double rating ) {
    this.rating = rating;
  }

  public void setLicenseNumber (String licenseNumber) {
    this.licenseNumber = licenseNumber;
  }

  public void setCarMakeandModel (String carMakeandModel) {
    this.carMakeandModel = carMakeandModel;
  }

}
