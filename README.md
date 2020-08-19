# RideShare

## Business Design
- To design a personalization based event recommendation systems for event search.

## General Instruction
- Designed and created a long-distance ride sharing web application to help users set up, search and manage a ride with
customized ride requirements using `Spring Boot, React and AWS Redshift`
- Implemented a bi-directional `A* Dijkstra’s algorithm` to find the shortest path between two geocodes
- Developed backend functionality to return the ordered search results of rides based on riders’ requirements, e.g. departure time,
driver ratings, and detour mileage
- Designed the frontend UI with `React Hooks, JavaScript, Bootstrap` and customized map view with `Google Maps API`
- Optimized database architecture with `AWS Redshift` and built caching system for searched results with `Google Guava Cache`

## Infrastructure Design
- 3-tier architecture
   * Presentation tier: React, BootStrap
   * Data tier: AWS Redshift
   * Logic tier: Java, Spring
   
## Infrastructure Design
 

> Local Development Environment
<a href="https://ibb.co/2PVWxgs"><img src="https://i.ibb.co/jG0bmgW/Screen-Shot-2020-08-18-at-10-26-37-PM.png" alt="Screen-Shot-2020-08-18-at-10-26-37-PM" border="0" width="1000" height= "600"></a>

> HTTP Endpoint Design
<a href="https://ibb.co/cwFJzcJ"><img src="https://i.ibb.co/HCz7mD7/Screen-Shot-2020-08-18-at-10-32-27-PM.png" alt="Screen-Shot-2020-08-18-at-10-32-27-PM" border="0" width="1000" height= "600"></a>

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
    
<a href="https://ibb.co/ZzhY85n"><img src="https://i.ibb.co/WvcPyZb/Screen-Shot-2020-08-18-at-10-36-22-PM.png" alt="Screen-Shot-2020-08-18-at-10-36-22-PM" border="0" border="0" width="1000" height= "600"></a>
