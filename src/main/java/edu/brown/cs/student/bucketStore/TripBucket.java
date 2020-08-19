package edu.brown.cs.student.bucketStore;

import java.util.HashSet;

import edu.brown.cs.student.trip.Trip;

class TripBucket {
	
	private double[] leftTopGeocode;
	private double[] rightBottomGeocode;
	private HashSet<String> trips; // trip ids
	
	public TripBucket(double[] leftTop, double[] rightBottom) {
		this.leftTopGeocode = leftTop;
		this.rightBottomGeocode = rightBottom;
		trips = new HashSet<>();
	}
	
	public static HashSet<String> bucketIntersection(TripBucket bucket1, TripBucket bucket2) {
		HashSet<String> intersect = new HashSet<String>(bucket1.trips);
		intersect.retainAll(bucket2.trips);
		return intersect;
	}
	
	public boolean tripExists(String trip) {
		return trips.contains(trip);
	}
	
	public void removeTrip(String tripToRemove) {
		if (trips.contains(tripToRemove)) {
			trips.remove(tripToRemove);
		}
	}
	
	public void insertTrip(String newTrip) {
		trips.add(newTrip);
	}

	public double[] getLeftTopGeocode() {
		return leftTopGeocode;
	}

	public double[] getRightBottomGeocode() {
		return rightBottomGeocode;
	}
	
}
