package edu.brown.cs.student.bucketStore;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

import edu.brown.cs.student.trip.Trip;

/**
 * topleft of the matrix corresponds to northwest corner of the map
 * row axis corresponds to the latitude axis, column is longitude axis
 * @author tony
 *
 */
@Component
class BucketMatrix {
	
	public static double REGION_SIDELEN = 0.25;
	public static double SOUTH_BORDER = 24.5;
	public static double NORTH_BORDER = 49.2;
	public static double WEST_BORDER = 124.8;
	public static double EAST_BORDER = 67.0;
	private TripBucket[][] storage;
	private HashMap<String, List<TripBucket>> tripIdToBucket;
	
	public BucketMatrix() {
		int numRows = (int) Math.ceil((NORTH_BORDER - SOUTH_BORDER)/REGION_SIDELEN);
		int numCols = (int) Math.ceil((WEST_BORDER - EAST_BORDER)/REGION_SIDELEN); 
		storage = new TripBucket[numRows][numCols];
		tripIdToBucket = new HashMap<>();
		for (int i=0; i<numRows; i++ ) {
			for (int j=0; j<numCols; j++ ) {
				double[] topleft = {NORTH_BORDER - i * REGION_SIDELEN, 
									WEST_BORDER - j * REGION_SIDELEN};
				double[] bottomright = {NORTH_BORDER - (i+1) * REGION_SIDELEN, 
										WEST_BORDER - (j+1) * REGION_SIDELEN};
				// crop the coordinate overflow due to ceiling
				if (bottomright[0] < SOUTH_BORDER) {
					bottomright[0] = SOUTH_BORDER;
				}
				if (bottomright[1] < EAST_BORDER) {
					bottomright[1] = EAST_BORDER;
				}
				TripBucket bucket = new TripBucket(topleft, bottomright);
				storage[i][j] = bucket;
			}
		}
	}
	
	public void putTrip(String tripId, double lat, double lgn) throws CoordinateOutOfBoundException{
		// error check input
		// to be called sequentially on list of nodes
		double[] input = {lat, lgn};
		if (coordinateOutOfBound(input)) {
			throw new CoordinateOutOfBoundException("coordinate out of bound");
		}
		int[] indices = this.getRowColOnMatrix(lat, lgn);
		TripBucket bucket = this.storage[indices[0]][indices[1]];
		bucket.insertTrip(tripId);
		if (this.tripIdToBucket.containsKey(tripId)) {
			List<TripBucket> bucketList = this.tripIdToBucket.get(tripId);
			if (bucketList.get(bucketList.size()-1) != bucket) {
				this.tripIdToBucket.get(tripId).add(bucket);
			}
			return;
		}
		List<TripBucket> newSet = new ArrayList<>();
		newSet.add(bucket);
		this.tripIdToBucket.put(tripId, newSet);
	}
	
	// each input array should have two entries and follows [latitude, longitude]
	public HashSet<String> getCommonTripsFromBuckets(double[] position1, double[] position2) 
		throws CoordinateOutOfBoundException {
		// error check input
		if (coordinateOutOfBound(position1) || coordinateOutOfBound(position2)) {
			throw new CoordinateOutOfBoundException("coordinate out of bound");
		}
		int[] indices1 = this.getRowColOnMatrix(position1[0], position1[1]);
		int[] indices2 = this.getRowColOnMatrix(position2[0], position2[1]);
		return TripBucket.bucketIntersection(storage[indices1[0]][indices1[1]], 
											storage[indices2[0]][indices2[1]]);
 	}
	
	public void removeTrip(String tripId) {
		List<TripBucket> bucketsContainTrip = this.tripIdToBucket.get(tripId);
		Iterator<TripBucket> iter = bucketsContainTrip.iterator();
		while (iter.hasNext()) {
			TripBucket bucket = iter.next();
			bucket.removeTrip(tripId);
		}
		this.tripIdToBucket.remove(tripId);
	}
	
	// returns the indices in the matrix [row, column]
	private int[] getRowColOnMatrix(double lat, double lgn) {
		int[] position = new int[2];
		position[0] = (int) Math.floor((NORTH_BORDER - lat)/0.25);
		position[1] = (int) Math.floor((WEST_BORDER - lgn)/0.25);
		return position;
	}
	
	private boolean coordinateOutOfBound(double[] position) {
		if (position[0] < SOUTH_BORDER || position[0] > NORTH_BORDER) {
			return true;
		}
		if (position[1] < EAST_BORDER || position[1] > WEST_BORDER) {
			return true;
		}
		return false;
	}
	
	 
}
