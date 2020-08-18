package edu.brown.cs.student.hopp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import edu.brown.cs.student.database.Proxy;
import edu.brown.cs.student.driver.Driver;
import edu.brown.cs.student.map.Node;
import edu.brown.cs.student.map.Way;
import edu.brown.cs.student.rider.Rider;
import edu.brown.cs.student.trip.Trip;

@ComponentScan({"edu.brown.cs.student.hopp","edu.brown.cs.student.controller"})
@SpringBootApplication
public class HoppApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoppApplication.class, args);
		
		// connect to AWS database
		Proxy.connect();
		
		
		
		
		/**Setup all tables (one time thing) **/
		//Proxy.setUpRiderTable();
		//Proxy.setUpDriverTable();
		//Proxy.setUpTripTable();
		Proxy.setUpNodeTable();
		Proxy.setUpWayTable();
		
		
		System.out.println("Table test starting...");
		Rider rider = new Rider("userNameTestor", "firstNameTest", "lastNameTest", 
				"address   address Testing 123", "binary 467", "+17830992399888", 
				"345/12/2122", "hjjh@smail.com","123456789");

		if (Proxy.checkRiderExists("123456789")==false) {
			Proxy.insertRider(rider);
		} else {
			
			Proxy.updateRider(rider);
		}
		
		
		Driver driver = new Driver("userName", "firstName", 
			      "lastName", "address", 
			      "gender", "phoneNumber", 
			      "birthday", "email", 
			      "licenseNumber", "carMakeandModel", "123456789");
		
		if (Proxy.checkDriverExists("123456789")==false) {
			Proxy.insertDriver(driver);
		} else {
			
			Proxy.updateDriver(driver);
		}
		
		
		Node origin = new Node("origin", 1.0, 2.0);
		Node destination = new Node("id", 4.0, 5.0);
		Trip trip = new Trip("token", driver, 5, origin,
				destination, "2020-04-27", 10.0);
		
		if (Proxy.checkTripExists("token")==false) {
			Proxy.insertTrip(trip);
		} else {
			
			Proxy.updateTrip(trip);
		}
		
		if (Proxy.checkNodeExists("origin")==false) {
			Proxy.insertNode(origin);
		} else {
			
			Proxy.updateNode(origin);
		}
		
		Way way = new Way("id", origin, destination);
		
		if (Proxy.checkWayExists("id")==false) {
			Proxy.insertWay(way);
		} else {
			
			Proxy.updateWay(way);
		}

		Driver d = Proxy.getDriverFromToken("123456789");
		Rider r = Proxy.getRiderFromToken("123456789");
		Trip t = Proxy.getTripFromToken("token");
		Node n = Proxy.getNodeFromToken("origin");
		Way w = Proxy.getWayFromToken("id");
		
		System.out.println("Printing characteristics in tables");
		
		System.out.println(r.getUserName());
		System.out.println(d.getCarMakeandModel());
		System.out.println(t.getToken());
		System.out.println(n.getLatitude());
		System.out.println(w.getWeight());
		
		System.out.println("Table test done.");
		
		
		
		Proxy.closeEverything();
		
		
	}
}
