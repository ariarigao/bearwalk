# RideShare

## Business Design
- To design a long-distance ride sharing web application to help users set up, search and manage a ride with customized ride requirements.

## General Instruction
- Designed and created a long-distance ride sharing web application to help users set up, search and manage a ride with
customized ride requirements using `Spring Boot, React and AWS Redshift`
- Implemented a bi-directional `A* Dijkstra’s algorithm` to find the shortest path between two geocodes and a grid-based matching process
to match drivers to riders. 
- Developed backend functionality to match Driver to Riders by dviding the map into grids, where we store trips that pass through them. 
A trip is matched to a rider when the rider's origin and destination fall into the grids that contains that trip.
- Developed backend functionality to return the ordered search results of rides based on riders’ requirements, e.g. departure time,
driver ratings, and detour mileage
- Designed the frontend UI with `React Hooks, React Router, JavaScript, Bootstrap` and customized map view with `Google Maps API`
- Optimized database architecture with `AWS Redshift` and built caching system for searched results with `Google Guava Cache`

## Website Demo
- Deployed the project on s3. http://rideshare-20200818203058-hostingbucket-rideshare.s3-website.us-east-2.amazonaws.com
- Please use our provided username and password. The sign-up function is disabled since our EC2 server is not running due to hourly opertional cost. 
- username: twang58
- password: @Wtc1234

## In Rider Mode
> Rider inputs a Trip Request
![riderpost](https://raw.githubusercontent.com/izziegeez/RideShare/master/riderpost.png)

-the user will see in questionnaire the following input entries:
   * Origin and distance range (circle)
   * Destination and distance range (circle)
   * Date time
   * Max cost
   * Seats needed
-Alternative to typing, users can interact with the map (drop a location marker) to input the origin/destination.
- After the user submits the form, the program searches through the driver trip database to match with drivers. The result of the search will be displayed on the next page:
> Trip Result Page


![tripresult](https://raw.githubusercontent.com/izziegeez/RideShare/master/tripresult.png)

- On this page, users will see all matching results displayed on the left side-bar. For each driver, the following factors are displayed:
  * Rating
  * Origin
  * Destination
  * Time
  * Price
- Users can filter and sort the results by each of these categories and also distance to pickup location or distance to drop off location.
- When the user clicks on a driver, the map will display the driver’s full trip. 

## In Driver Mode
> Driver supplies a trip 
![driverpost](https://raw.githubusercontent.com/izziegeez/RideShare/master/driverpost.png)
-the user will see in questionnaire the following input entries:
  Trip name
   * Origin
   * Destination
   * Date time
   * Price
   * Seats available
-Drivers can interact with the map (drop a location marker) to input the locations.

- After the driver submits the form, the program searches through the rider request database to match with riders. The driver receives a notification that the trip has been created. Then the program routes to the page for the newly-created trip in the driver's trip manager. The page contains driver info and all riders that have been matched. 

## Trip Manager
> Trip Manager for Rider and Driver
![tripmanager](https://raw.githubusercontent.com/izziegeez/RideShare/master/tripmanager.png)

-In riders’ trip manager page, riders can view all trips including those matched with a driver and those ride requests that are still pending. For trips matched with a driver the rider can click on “leave” to leave the trip. The driver will then receive a notification saying that the rider has left your trip. If the driver’s trip was at capacity, it will now be re-added to the trip database.

- In driver's trip manager page, drivers can view rider details such as origin, destination, rating and contact information. They may then contact the rider on their own accord to handle logistics. However, the driver may choose to remove riders. If a rider is removed, the rider gets a notification that they are removed and is added to the rider request database. If there are seats available for the trip, the driver will then be re-added to the driver trip database for riders to match.


## Infrastructure Design
- 3-tier architecture
   * Presentation tier: React, BootStrap
   * Data tier: AWS Redshift
   * Logic tier: Java, Spring
- Third Party Service
   * Google Maps API
   * AWS Cognito
   
## Local Development Environment
![design](https://raw.githubusercontent.com/izziegeez/RideShare/master/design.png)

## Endpoint Design
![endpoint](https://raw.githubusercontent.com/izziegeez/RideShare/master/endpoint.png)

## Database Design
- AWS Redshift 
   * **Trip** - store trip information, along with driver ID, and a list of rider ID's.
   * **Rider** - store rider information.
   * **Driver** - store driver information
   * **Node** - store a Node in the map, along with its latitude and longitude. 
   * **Way** - store a Way in the map, along with its starting Node and ending Node.
- shaded keys are primary keys
- arrows point from a foreign key that uniquely identifies a fieled in another table **

> Database Design
    
![design](https://raw.githubusercontent.com/izziegeez/RideShare/master/database.png)
