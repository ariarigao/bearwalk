# RideShare

## Business Design
- To design a long-distance ride sharing web application to help users set up, search and manage a ride with customized ride requirements.

## General Instruction
- Designed and created a long-distance ride sharing web application to help users set up, search and manage a ride with
customized ride requirements using `Spring Boot, React and AWS Redshift`
- Implemented a bi-directional `A* Dijkstra’s algorithm` to find the shortest path between two geocodes
- Developed backend functionality to return the ordered search results of rides based on riders’ requirements, e.g. departure time,
driver ratings, and detour mileage
- Designed the frontend UI with `React Hooks, JavaScript, Bootstrap` and customized map view with `Google Maps API`
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

<a href="https://ibb.co/dJfSKYm"><img src="https://i.ibb.co/2YFwK4Z/Screen-Shot-2020-08-18-at-11-23-31-PM.png" alt="Screen-Shot-2020-08-18-at-11-23-31-PM" border="0"  width="900" height= "600"></a>
- On this page, users will see all matching results displayed on the left side-bar. For each driver, the following factors are displayed:
  * Rating
  * Origin
  * Destination
  * Time
  * Price
- Users can filter and sort the results by each of these categories and also distance to pickup location or distance to drop off location.
- When the user clicks on a driver, the map will display the driver’s full trip. 




## Infrastructure Design
- 3-tier architecture
   * Presentation tier: React, BootStrap
   * Data tier: AWS Redshift
   * Logic tier: Java, Spring
   
## Local Development Environment
![design](https://raw.githubusercontent.com/izziegeez/RideShare/master/design.png)

## Infrastructure Design
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
