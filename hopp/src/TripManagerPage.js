


import React, { Component, useState} from 'react';
import './tripManager.css'
import thumb from "./thumb.png";
import account from "./account.svg";
import TripCard from './TripCard'
import PersonCard from './PersonCard';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom"; 




// TripManager
class TripManagerPage extends Component{
    constructor(props) {
        
        
        // send the server the user
        // get a list of trips from the server
        super(props)
    
    
        this.state ={
            trips:[{ID: "1", time: "19:00", driverID: "8f24ed55-9a0f-4e7e-bca3-7d45b0bbac44", driverName: "Tiancheng Wang", riders:[{riderID: "notme", name:"Izzy", seats:"2", contact: "4012865955"}]},
            { ID: "4", time: "2:00", driverID: "8f24ed55-9a0f-4e7e-bca3-7d45b0bbac44", driverName: "Tiancheng Wang", riders:[{riderID: "notme", name:"Joe", seats:"2", contact: "4012835955"}]},
            { ID: "2", time: "7:00", driverID: "harman suri", driverName: "Tony", riders:[{riderID: "8f24ed55-9a0f-4e7e-bca3-7d45b0bbac44",name:"Tiancheng Wang", seats:"2", contact: "4012865955"}]},
            { ID: "3", time: "13:00", driverID: "harman suri", driverName: "mustafa bunny", riders:[{riderID: "8f24ed55-9a0f-4e7e-bca3-7d45b0bbac44",name:"Tony", seats:"2", contact: "4012865955"}]}
        ],
        // trips:[],
            currIndex: 0,
            isRider: true,
            riderTrips: [],
            driverTrips: [],
            RiderBgColor: '#EDAC1D',
            DriverBgColor: 'white',
        }
        
    }

    componentDidMount() {
                // call fetch request to get all trip info and store it in trips
                // this.setState({
                //     trips:[{ID: "1", time: "2323", driverID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9", driverName: "Tiancheng Wang", riders:[{riderID: "notme", name:"Izzy Gao", seats:"2", contact: "4012865955"}], tripOrigin: "prov", tripDest: "london"},
                //             { ID: "2", time: "2323", driverID: "harman suri", driverName: "mustafa ghani", riders:[{riderID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9",name:"Tiancheng Wang", seats:"2", contact: "4012865955"}], tripOrigin: "hello", tripDest: "world"},
                //             { ID: "3", time: "2323", driverID: "harman suri", driverName: "mustafa ghani", riders:[{riderID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9",name:"IZZY", seats:"2", contact: "4012865955"}], tripOrigin: "nihao", tripDest: "byebye"}
                //         ],
                
                // })
                
                this.splitRider()
                this.splitDriver()
                
                return
                
                const id = JSON.parse(sessionStorage.getItem('user')).sub
                const requestMsg = {id: id} //send the server the rider/driver id 
                fetch('http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/trip_info_post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestMsg),
                })
                .then((response)=>{
     
                    response.text().then((r) =>{
                        // do something with the text response
                        console.log("r",r) 
                        console.log("r",typeof(r)) 
                        const resTrips = []
                        try {
                            console.log('try here')
                            const res = JSON.parse(r)
                            //for every single trip 
                            if(res.legnth!==0){
                                for (var i=0; i<res.length; i++){
                                    const riderList = []
                                    if(res[i].riders.length!==0){
                                        //for every single rider on this trip
                                        for(var j=0; j<res[i].riders.length; j++){                          
                                            const rider = {
                                                riderID: res[i].riders[j].riderID,
                                                name: res[i].riders[j].firstName + " " + res[i].riders[j].lastName,
                                                contact: res[i].riders[j].phone,
                                                stopOrigin: res[i].riders[j].origin,
                                                stopDest: res[i].riders[j].destination,
                                            }
                                            console.log("should not be here")
                                            riderList.push(rider)
                                        }
                                    }

                                        // one trip has the following fields
                                        const trip = {
                
                                            ID: res[i].id, 
                                            driverID: res[i].driverID,
                                            driverName: res[i].driverFirstName + " "+ res[i].driverLastName,
                                            time: res[i].date,
                                            driverPhone: res[i].phone,
                                            // riders: 
                                            riders: riderList,
                                            // allStops: res[i].riderStops,
                                            tripOrigin: res[i].tripOrigin,
                                            tripDest: res[i].tripDest,
    
                                        }
                                        resTrips.push(trip)
                                    }

                                }

                            console.log("resTrips", resTrips)
                        
                            this.setState({
                                trips: resTrips,
                                
                            })
                            console.log("im here", this.state.trips.tripOrigin)

                            // FIXME:
                            this.splitDriver()
                            this.splitRider()
                            
                        
                        } catch {
                            console.trace()
                            console.log("error parsing the response Trip Manager")

                            this.setState({
                                trips:[{ID: "1", time: "2323", driverID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9", driverName: "Tiancheng Wang", riders:[{riderID: "notme", name:"Izzy Gao", seats:"2", contact: "4012865955"}], tripOrigin: "prov", tripDest: "london"
                            },
                                        { ID: "2", time: "2323", driverID: "harman suri", driverName: "mustafa ghani", riders:[{riderID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9",name:"Tiancheng Wang", seats:"2", contact: "4012865955"}], tripOrigin: "hello", tripDest: "world"},
                                        { ID: "3", time: "2323", driverID: "harman suri", driverName: "mustafa ghani", riders:[{riderID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9",name:"IZZY", seats:"2", contact: "4012865955"}], tripOrigin: "nihao", tripDest: "byebye"}
                                    ],
                            
                            })
                            this.splitDriver()
                            this.splitRider()


                            
                        }
                    })
        
                })
                .catch(()=> {
                    console.log('failed to contact the backend')

                    this.setState({
                        trips:[{ID: "1", time: "2323", driverID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9", driverName: "Tiancheng Wang", riders:[{riderID: "notme", name:"Izzy Gao", seats:"2", contact: "4012865955"}], tripOrigin: "prov", tripDest: "london"
                    },
                                { ID: "2", time: "2323", driverID: "harman suri", driverName: "mustafa ghani", riders:[{riderID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9",name:"Tiancheng Wang", seats:"2", contact: "4012865955"}], tripOrigin: "hello", tripDest: "world"},
                                { ID: "3", time: "2323", driverID: "harman suri", driverName: "mustafa ghani", riders:[{riderID: "0f4dc5f1-53e2-4683-95b9-adfbe63c55a9",name:"IZZY", seats:"2", contact: "4012865955"}], tripOrigin: "nihao", tripDest: "byebye"}
                            ],
                    
                    })
                    this.splitDriver()
                    this.splitRider()
                })

    }

    logoutHandler() {
        sessionStorage.clear();
        this.props.history.push('/login')
    }

    createTripList() {
    
        if(this.state.isRider){
            const items = []
            for (const [index, value] of this.state.riderTrips.entries()) {
                console.log("createtrip list",value.ID)
                items.push(<TripCard tripOrigin={value.tripOrigin} tripDest={value.tripDest} tripID={value.ID} tripTime={value.time} myIndex={index} currSelect={ this.state.currIndex } handleSwitchTrip={(idx) => { this.setState({currIndex: idx}) }} />)
              }
            return items
        }else{
            const items = []
            for (const [index, value] of this.state.driverTrips.entries()) {
                console.log("createtrip list",value.ID)
                items.push(<TripCard  tripOrigin={value.tripOrigin} tripDest={value.tripDest} tripID={value.ID} tripTime={value.time} myIndex={index} currSelect={ this.state.currIndex } handleSwitchTrip={(idx) => { this.setState({currIndex: idx}) }} />)
              }
            return items
        }
       
    }

    splitDriver = () => {
        if (this.state.trips.length === 0) {
            this.setState({
                driverTrips: [],
                // currIndex :0,
            });
            return
        }
    //find a list of trips where this person is the driver
        const trips = this.state.trips
        var userID = JSON.parse(sessionStorage.getItem('user')).sub
        const userName = JSON.parse(sessionStorage.getItem('user')).given_name + " "+JSON.parse(sessionStorage.getItem('user')).family_name 
        const resTrips = []
        //FIXME:
        //userID = "8f24ed55-9a0f-4e7e-bca3-7d45b0bbac44"

        for (var i=0; i<trips.length; i++){
            const currTrip = trips[i]
                if(currTrip.driverID === userID){
                resTrips.push(currTrip)
            }
        }
        this.setState({
            driverTrips:resTrips,
        });
        
    }


    splitRider = () => {
        //find a list of trips where this person is the driver

        if (this.state.trips.length === 0) {
            this.setState({
                riderTrips: [],
                // currIndex :0,
            });
            return
        }

            const trips = this.state.trips
            // console.log("addedToRiderList", trips)
            var userID = JSON.parse(sessionStorage.getItem('user')).sub

            const userName = JSON.parse(sessionStorage.getItem('user')).given_name + " "+JSON.parse(sessionStorage.getItem('user')).family_name 
            const resTrips = []
            //FIXME:
            
            
            for (var i=0; i<trips.length; i++){
                const currTrip = trips[i]

                    for(var j=0; j<currTrip.riders.length; j++){
                        if(currTrip.riders[j].riderID === userID){
                            resTrips.push(currTrip)
                        }
                    }
                }
            
            this.setState({
                riderTrips:resTrips,
                // currIndex :0,
            });
            
        }
    

    handleRemoveTrip = () =>{
        

        const currTripID  = this.state.driverTrips[this.state.currIndex].ID
        const userID = JSON.parse(sessionStorage.getItem('user')).sub
        const requestMsg = {
            userID: userID,
            tripID: currTripID, 
        }
        const temp = this.state.driverTrips
                temp.splice(this.state.currIndex,1)
                this.setState({
                    currIndex: 0,
                    driverTrips: temp,
                })
       
        fetch('http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/driver_cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestMsg),
        })
        //response is one trip obejct
        .then((response)=>{
            response.text().then((r) =>{

                const temp = this.state.driverTrips
                temp.splice(this.state.currIndex,1)
                this.setState({
                    currIndex: 0,
                    driverTrips: temp,
                })


            })
            
        })
        .catch(()=> {
            console.log(requestMsg)
            console.log('failed to contact the backend')
        })

     // this.state.trips is a list
        const newArray = this.state.trips
        newArray.splice(this.state.currIndex, 1)
        // oldArray[this.state.currIndex] = trip
        this.setState({
            trips:newArray,
            currIndex :0,
        });
        
    }
    //this.props.personName, this.props.myIndex
    handleRemoveRider = (myIndex) =>{
        if (this.state.isRider){
            const currTripID  = this.state.riderTrips[this.state.currIndex].ID
            const userID = JSON.parse(sessionStorage.getItem('user')).sub
            // console.log("removetrip", this.props.tripID)
            const requestMsg = {
                userID: userID,
                tripID: currTripID, 
            }

            // FIXME:
            const temp = this.state.riderTrips
                    temp.splice(this.state.currIndex,1)
                    this.setState({
                        currIndex: 0,
                        riderTrips: temp,
                    })
            fetch('http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/rider_remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestMsg),
            })
            //response is one trip obejct
            .then((response)=>{
                response.text().then((r) =>{

                    const temp = this.state.riderTrips
                    temp.splice(this.state.currIndex,1)
                    this.setState({
                        currIndex: 0,
                        riderTrips: temp,
                    })
                })
                
            })
            .catch(()=> {
                console.log(requestMsg)
                console.log('failed to contact the backend')
            })
        }else{ //not rider --> driver
            console.log("in driver remove")
            const currTripID  = this.state.driverTrips[this.state.currIndex].ID
            //want to remove the rider
            const userID = this.state.driverTrips[this.state.currIndex].riders[myIndex].riderID
            // console.log("removetrip", this.props.tripID)

            const requestMsg = {
                userID: userID,
                tripID: currTripID, 
            }

            //FIXME:
            const temp = this.state.driverTrips
                    temp[this.state.currIndex].riders.splice(myIndex,1)
                    this.setState({
                        driverTrips: temp
                    })
           
            fetch('http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/driver_remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestMsg),
            })
            //response is one trip obejct
            .then((response)=>{
                response.text().then((r) =>{

                    const temp = this.state.driverTrips
                    temp[this.state.currIndex].riders.splice(myIndex,1)
                    this.setState({
                        driverTrips: temp
                    })
                })
                
            })
            .catch(()=> {
                console.log(requestMsg)
                console.log('failed to contact the backend')
            })
        }
    }


    createInfoList() {
        console.log("create",this.state.riderTrips)
        // console.log(this.state.currIndex)
        
        const items = []
        if (this.state.isRider) {
            if (this.state.riderTrips.length === 0) {
                return items
            }
            const name =  this.state.riderTrips[this.state.currIndex].driverName
            const origin = this.state.riderTrips[this.state.currIndex].tripOrigin
            const dest = this.state.riderTrips[this.state.currIndex].tripDest
            const contact = this.state.riderTrips[this.state.currIndex].driverPhone
            const driverID = this.state.riderTrips[this.state.currIndex].driverID
            items.push(<PersonCard isRider= {this.state.isRider} riderID= {driverID} personName={name} stopOrigin={origin} 
                stopDest={dest} contact={contact} myIndex={0} 
                removeCallback= {this.handleRemoveRider.bind(this)}/>)

            return items
        }
        // currently on driver page
        if (this.state.driverTrips.length === 0) {
            return items
        }
        const riders = this.state.driverTrips[this.state.currIndex].riders
        for (const [index, value] of riders.entries()) {
            items.push(<PersonCard isRider= {this.state.isRider}  riderID={value.riderID} personName={value.name} stopOrigin={value.stopOrigin} 
                stopDest={value.stopDest} contact={value.contact} myIndex={index} 
                removeCallback= {this.handleRemoveRider.bind(this)}/>)
        }
        return items
       }

       displayOrigin =() =>{
            if(this.state.isRider){
                if(this.state.riderTrips.length ===0 ){
                    return null
                }else{
                    return (<span>Origin: {this.state.riderTrips[this.state.currIndex].tripOrigin} </span>)
                }

            }else{ //driver
                if(this.state.driverTrips.length ===0 ){
                    return null
                }else{
                    return (<span> Origin:{this.state.driverTrips[this.state.currIndex].tripOrigin} </span>)
                }
            }
       }

       displayDest =() =>{
        if(this.state.isRider){
            if(this.state.riderTrips.length ===0 ){
                return null
            }else{
                return (<span>Destination: {this.state.riderTrips[this.state.currIndex].tripDest} </span>)
            }

        }else{ //driver
            if(this.state.driverTrips.length ===0 ){
                return null
            }else{
                return (<span>Destination:  {this.state.driverTrips[this.state.currIndex].tripDest} </span>)
            }
        }
   }


    render() {
        return(
            <div>
                <div class="topbar">
                    <div className="topnav">
                    <div className="topnav-left">
                        <img src={thumb} alt="thumb" className = "thumb" />
                        { sessionStorage.getItem('user') != null ? <h2 className="logout" onClick={this.logoutHandler.bind(this)}> Log Out </h2> : null}
                    </div>
                   
                    <div >
                        { sessionStorage.getItem('user') != null ? 
                        <div className="topnav-right">
                            <Link id="tripManager" to="/HomePage/RiderPost">Home Page</Link> 
                            
                    
                            <Link to="/account">
                                <img src={account} alt="account" className = "account"/>
                            </Link>
                        </div>
                        : null}
                    </div>
                </div> 
                <h1 id='title'> Trip Manager </h1>
                <div id="selector">
                    <span onClick= {()=> {
                        this.setState({
                            isRider : false,
                            RiderBgColor: 'white',
                            DriverBgColor: '#EDAC1D',
                            currIndex:0,
                        });
                    }} style={{color: this.state.DriverBgColor} }>   Driver  </span>
                    <span onClick= {()=> {
                        this.setState({
                            isRider: true,
                            DriverBgColor: 'white',
                            RiderBgColor: '#EDAC1D',
                            currIndex:0,
                        });
                    }} style={{color: this.state.RiderBgColor} }> Rider</span>
                  
        
                </div>
                
            </div>

            <div id="bodyContainer" >
                <div id="tripPage"> 
                    <div id="tripBox">
                        <div id="tripTop">
                            <h2> spring break COVID 19 </h2>

                            <div id="tripInput">
                                <i class="arrow up"></i>
                                <i class="arrow down"></i>
                                <input placeholder="" />
                            </div>
                        </div>
                        <div id="tripResults">
                            <div id="tripList">
                                {this.createTripList()}
                            </div>
                            <div id="tripInfo">
                                <div id="tripHeader">
                                    {/* <h2>spring break COVID 19</h2> */}
                                     {this.displayOrigin()}
                                     <br />
                                     <br />
                                    {this.displayDest()}
                                
                                   
                                    {/* { this.state.trips===null || this.state.trips[this.state.currIndex].riders===null ||this.state.trips.length===0 ||  this.state.trips[this.state.currIndex].riders===0 ? 
                                         <h2 id="cap">capacity 0/3</h2>
                                         : 
                                         <h2 id="cap">capacity {this.state.trips[this.state.currIndex].riders.length}/3</h2>
                                    } */}
                                    
                                   { !this.state.isRider && this.state.driverTrips.length!==0 ?
                                         <button class='cancel-button' onClick= {this.handleRemoveTrip}> Cancel </button>
                                    : null
                                    }
                                 
                                </div>

                                {this.createInfoList()}
        

                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
        )
    }
}

export default TripManagerPage;