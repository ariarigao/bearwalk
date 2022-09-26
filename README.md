# BearWalk

## Business Design
- To design a night safety service web application to enable SafeWalk escorts to get the shortest distance route to
students that requested the service and to the destinations they requested.


## General Instruction
- Built and deployed a night safety service web application to enable SafeWalk escorts to get the shortest distance route to
students that requested the service and to the destinations they requested, using `Java, React, and MongoDB`.
- Implemented a bi-directional `A* Dijkstra’s algorithm` to find the shortest path between two geocodes and a grid-based matching process
to match students to night walkers. 
- Developed backend functionality to match safety walkers to students by dividing the map into grids, where we store trips that pass through them. 
A trip is matched to a student when the student's origin and destination fall into the grids that contains that trip.
- Enabled interactive map visualization of the Berkeley campus with Google Maps API, and built frontend features with React.

## Website Demo
- Deployed the project on s3. http://rideshare-20200818203058-hostingbucket-rideshare.s3-website.us-east-2.amazonaws.com
- Please use our provided username and password. The sign-up function is disabled since our EC2 server is not running due to hourly opertional cost. 
- username: twang58
- password: @Wtc1234

## In Stduent Mode
> Student inputs a Trip Request

 users can interact with the map (drop a location marker) to input the origin/destination.
- After the user submits the form, the program searches through the safety walker trip database to match with 
s. The result of the search will be displayed on the next page:
> Trip Result Page


- On this page, users will see all matching results displayed on the left side-bar. For each night walker, the following factors are displayed:
  * Rating
  * Origin
  * Destination
  * Time
- Users can filter and sort the results by each of these categories and also distance to pickup location or distance to drop off location.
- When the user clicks on a safety walker, the map will display the driver’s full trip. 

## In safety walker Mode
> safety walker supplies a trip 

-Safety Walkers can interact with the map (drop a location marker) to input the locations.

- After the safety walker submits the form, the program searches through the student trip request database to match with students. The safety walker receives a notification that the trip has been created. Then the program routes to the page for the newly-created trip in the safety walker's trip manager. The page contains safety walker info and all students that have been matched. 

## Trip Manager
> Trip Manager for Safety Walkers and Studnets


-In students’ trip manager page, riders can view all trips including those matched with a safety walker and those trip requests that are still pending. For trips matched with a safety walker the student can click on “leave” to leave the trip. The safety walker will then receive a notification saying that the student has left your trip. If the safety walker’s trip was at capacity, it will now be re-added to the trip database.

- In safety walker's trip manager page, safety walkers can view rider details such as origin, destination, rating and contact information. They may then contact the student on their own accord to handle logistics. However, the safety walker may choose to remove students. If a studentis removed, the student gets a notification that they are removed and is added to the student request database. If there are seats available for the trip, the safety walker will then be re-added to the safety walker trip database for students to match.

## Algorithm Design

- We divide the map into regions of side length 0.25 degrees (16 miles). For each region, we make a `bucket object` that contains all trips that pass through the region.
 * **Populating buckets**: When the driver enters a new trip, the backend runs `bidirectional A-star algorithm` (explained below) from the origin to the destination of the trip. We then iterate through the shortest path, a list of nodes on the map, and enter the trip into the buckets that correspond to the regions where the nodes fall.
 * **Bucket-based Matching**: Rider enters the origin and destination. The `matching algorithm` computes the buckets where the origin and destination belong to respectively. Then it takes the `intersection` of trips in those buckets. For each trip in both buckets, the algorithm then checks whether the rider origin bucket precedes the rider destination bucket in the list of buckets for the trip. If true, then the algorithm matches the trip to the rider request. The frontend displays all matched trips for rider to choose.
 * **Join trip**: After the rider chooses to join a trip, the algorithm first removes all references of the trip from buckets. It then computes the shortest path that goes through the rider origin and destination and populates the buckets that the new path passes through with the trip.
 * **bidirectional A-star**: `A-star algorithm` adapts from the `Dijkstra algorithm` for the shortest path. The difference is that A-star orders the priority based on the distance traveled so far plus the euclidean distance to the destination. The additional heuristic ensures the algorithm terminates faster. Bidirectional A-star runs A-star from both origin and destination (on the reverse graph) in an alternating fashion. The shortest path is found at the point where the space explored by both directions first meets.
 * **Runtime Consideration**: The algorithm is optimized for fast rider matching. Processing a driver trip requires running the bidirectional A-star algorithm and populating the buckets. In comparison, matching only takes the runtime of a bucket intersection and looping through the trips in the intersection to make sure the origin and destination are in the correct order.

## Infrastructure Design
- 3-tier architecture
   * Presentation tier: React, BootStrap
   * Data tier: MongoDB 
   * Logic tier: Java, Spring
- Third Party Service
   * Google Maps API
   * AWS Cognito


## Database Design
- MongoDB
   * **Trip** - store trip information, along with night walker ID, and a list of student ID's.
   * **Student** - store student information.
   * **NightWalker** - store night walker information
   * **Node** - store a Node in the map, along with its latitude and longitude. 
   * **Way** - store a Way in the map, along with its starting Node and ending Node.
- shaded keys are primary keys
- arrows point from a foreign key that uniquely identifies a fieled in another table **


