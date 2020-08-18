import React, { Component } from 'react';
import { Auth, formContainer } from 'aws-amplify';
import './rider.css'
import { Link } from "react-router-dom";
import TopNav from './TopNav';
import './login.css';
// import MapWrapped from './MapWrapped';
import scriptLoader from 'react-async-script-loader';
import './searchResult.css';
import ninja from "./driver_icon.png";


class RiderPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onSearchResultPage: false,
            originMarkerLoc: {
                lat: 42.3601,
                lng: -71.0589,
            },
            destMarkerLoc: {
                lat: 42.3601,
                lng: -71.0489,
            },
            datetime:'',
            price:'',
            seats:'',
            originName: '',
            destName: '',
            searchResults: [],

            confirmedTrip: {
                datetime:'',
                price: '',
                seats: '',
                originName: '',
                destName: '',
            }
        }
        this.handleInput = this.handleInput.bind(this)
        this.findPath = this.findPath.bind(this);
    }
      componentWillReceiveProps({isScriptLoadSucceed}){
        if (isScriptLoadSucceed) {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: this.state.originMarkerLoc.lat,
                    lng: this.state.originMarkerLoc.lng-1,
                },
                zoom: 8,
                disableDefaultUI: true,
            });
            
            const markerOrigin = new window.google.maps.Marker({
                position: this.state.originMarkerLoc,
                map: map,
                draggable: true,
                title: 'origin',
                icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            });

            const markerDest = new window.google.maps.Marker({
                position: this.state.destMarkerLoc,
                map: map,
                draggable: true,
                title: 'destination',
                icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            });
            markerOrigin.addListener('dragend', ()=>{
                const newLoc = {
                        lat: markerOrigin.getPosition().lat(),
                        lng: markerOrigin.getPosition().lng(),
                }
                this.setState({
                    originMarkerLoc: newLoc,
                    originName: (Math.round(newLoc.lat * 1000)/1000).toString() + " ; " + (Math.round(newLoc.lng * 1000)/1000).toString(),
                })  
            });
            markerDest.addListener('dragend', ()=>{
                const newLoc2 = {
                        lat: markerDest.getPosition().lat(),
                        lng: markerDest.getPosition().lng(),
                }
                this.setState({
                    destMarkerLoc: newLoc2,
                    destName: (Math.round(newLoc2.lat * 1000)/1000).toString() + " ; " + (Math.round(newLoc2.lng * 1000)/1000).toString(),
                })      
            });
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            this.setState({
                map: map,
                markerOrigin: markerOrigin,
                markerDest: markerDest,
                dirService: directionsService,
                dirRenderer: directionsRenderer,
            })
            

                // add autocomplete
            const options = {
                componentRestrictions: {country: 'us'}
            }
            const autoCompleteOrigin = new window.google.maps.places.Autocomplete(document.getElementById('origin'), options)
            autoCompleteOrigin.addListener('place_changed', ()=> {
                try {
                    const originResult = autoCompleteOrigin.getPlace()
                    this.setState({originName: originResult.formatted_address})
                    const newLoc = {
                        lat: originResult.geometry.location.lat(),
                        lng: originResult.geometry.location.lng(),
                    }
                    this.setState({
                        originMarkerLoc: newLoc,
                    })
                    
                    markerOrigin.setPosition(newLoc)
                    // map position offset for nicer display
                    map.setCenter({lat: newLoc.lat,lng:newLoc.lng-1})
                } catch {
                    return
                }

            })
            const autoCompleteDest = new window.google.maps.places.Autocomplete(document.getElementById('dest'), options)
            autoCompleteDest.addListener('place_changed', ()=> {
                try {
                    const destResult = autoCompleteDest.getPlace()
                    const newLoc = {
                        lat: destResult.geometry.location.lat(),
                        lng: destResult.geometry.location.lng(),
                    }
                    this.setState({
                        destMarkerLoc: newLoc,
                    })
                    this.setState({destName: destResult.formatted_address})
                    markerDest.setPosition(newLoc)
                    // map position offset for nicer display
                    map.setCenter({lat: newLoc.lat,lng:newLoc.lng-1})

                } catch {
                    return
                }
            })
        } else {
            console.log("load google map failed")
        }
    }
    
    findPath(originCoord, destCoord) {
        const request = {
            origin: originCoord,
            destination: destCoord,
            travelMode: 'DRIVING'
          };
          this.state.dirService.route(request, (response, status) => {
            if (status === 'OK') {
                console.log(response)
              this.state.dirRenderer.setDirections(response);
            }
          });
    }
    
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({onSearchResultPage: true})
        this.setState({searchResults: [{name: "twang", origin: 'aa', dest: 'bb', price: 'cc', time: 'dd', rating: 2}, {name: "twang", origin: 'aa', dest: 'bb', price: 'cc', time: 'dd', rating: 2}]})
        this.setState({searchResults: [{name: "twang", originCoord: {lat: 40.575, lng: -79.972 }, destCoord:{lat: 39.903, lng:-75.037}, originName: 'aa', destName: 'bb', price: 'cc', time: 'dd', rating: 2}, {name: "twang", originCoord: {lat: 41.387, lng:-78.571}, destCoord:{lat: 43.399, lng:-76.169,}, originName: 'aa', destName: 'bb', price: 'cc', time: 'dd', rating: 2}]})
        return
        // console.log(1212121212)
        // const id = JSON.parse(sessionStorage.getItem('user')).sub
        // const requestMsg = {
        //     id: id,
        //     origin: this.state.originMarkerLoc,
        //     dest: this.state.destMarkerLoc,
        //     time: this.state.datetime,
        //     seats: this.state.seats,
        // }
        
       
        // fetch('http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/rider_post', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(requestMsg),
        // })
        // .then((response)=>{
        //     // parse the response and set the searchResults state
        //     console.log("post returned")
        //     response.text().then((r) => {
        //         console.log(r)
        //         try {
        //             console.log("try")
        //             const searchList = []
        //             const res = JSON.parse(r)
        //             console.log("res",res)
        //             for (var i = 0; i < res.length; i++) {
        //                 console.log("res[i]", res[i])
       
        //                 const trip = {
                            
        //                     // save additional trip info
        //                     tripID: res[i].id,
                            
        //                     name: res[i].driverFirstName + "  " + res[i].driverLastName,
        //                     originCoord: {
        //                         lat: res[i].originLat,
        //                         lng: res[i].originLng,
        //                     }, 
        //                     destCoord:{
        //                         lat: res[i].destLat,
        //                         lng: res[i].destLng,
        //                     },
        //                     originName: res[i].tripOrigin,
        //                     destName: res[i].tripDest,
        //                     price: res[i].price,
        //                     time: res[i].date,
        //                     seat: res[i].available,
        //                 }

        //                 searchList.push(trip)
        //             }

                    
        //             this.setState({onSearchResultPage: true,
        //                 searchResults: searchList,
        //             })

        //             console.log("searchResult",this.state.searchResults)
        //     } catch {

                
        //         console.log("failed parsing response RiderPost")
        //     }
    
        //     })
            
        // })
        // .catch(()=> {
        //     console.log(requestMsg)
        //     console.log('failed to contact the backend')
        //     //reset the state
        //     this.setState({
        //         originMarkerLoc: {
        //             lat: 42.3601,
        //             lng: -71.0589,
        //         },
        //         destMarkerLoc: {
        //             lat: 42.3601,
        //             lng: -71.0489,
        //         },
        //         datetime:'',
        //         price:'',
        //         seats:'',
        //         originName: '',
        //         destName: '',
        //     })

            
        // })
    }

    handleConfirm(trip) {
        // reset the state
         this.setState({
            onSearchResultPage: false,
            originMarkerLoc: {
                lat: 42.3601,
                lng: -71.0589,
            },
            destMarkerLoc: {
                lat: 42.3601,
                lng: -71.0489,
            },
            datetime:'',
            price:'',
            seats:'',
            originName: '',
            destName: '',
            searchResults: [],
        })
        const alert = window.alertify.alert("Hopp", "You have successfully Joined the Trip!")
        alert.set('onok', ()=>{window.alertify.success("trip joined"); this.props.history.push("/HomePage/RiderPost"); window.alertify.alert().destroy()})
        alert.show()
        
        
    }



    handleSelect(originCoord, destCoord) {
        this.setState({originMarkerLoc: originCoord, destMarkerLoc: destCoord})
        this.state.markerOrigin.setPosition(originCoord)
        this.state.markerOrigin.setPosition(destCoord)
        this.findPath(originCoord, destCoord)
    }


    

    createDriverList() {
        const searchResults = this.state.searchResults
        const items = []
        for (const [index, value] of searchResults.entries()) {
            items.push(<SearchEntry tripID= {value.tripID} name={value.name} originCoord={value.originCoord} destCoord={value.destCoord} 
                origin={value.originName} dest={value.destName} price={value.price} time={value.time} rating={this.rating} 
                selectHandler={this.handleSelect.bind(this)} confirmHandler={this.handleConfirm.bind(this)}/>)
          }
        return items
    }


    // FIXME: disable custom address. only choose from autocorrect
    render() {
        return (
        <div>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
        { !this.state.onSearchResultPage ?

        <div class = "left" >
            <div class="wrapper">
                <div class="container">
                    <div class="questionnaire-title">Find a Ride!</div>
                    <form onSubmit={ this.handleSubmit.bind(this) } class="signup-form"> 
                        <div class ="origin-box">
                            <input id="origin" type= "text" placeholder= "Origin" class= "input" name='originName' value={this.state.originName} onChange={ this.handleInput } required />
                            <input id ="origin-range" type= "number" placeholder= "Mile Range" class= "input" required />
                        </div>
                        <div class ="dest-box">
                            <input id="dest" type= "text" placeholder= "Destination" class= "input" name='destName' value={this.state.destName} onChange={ this.handleInput } required />
                            <input id ="dest-range" type= "number" placeholder= "Mile Range" class= "input" required />
                        </div>
                        <input type="datetime-local" placeholder="Date & Time" class="input" name='datetime' value={this.state.datetime} onChange={ this.handleInput } required /><br/>
                        <input type="number" placeholder="Max Price" class="input" name='price' min ="0" value={this.state.price} onChange={ this.handleInput } required /><br/>
                        <input type="number" placeholder="Seats Needed" class="input" name='seats' min ="1" value={this.state.seats} onChange={ this.handleInput } required /><br/>
                        <button type="submit" class="btn" >Find Drivers </button>
                    </form>
                </div>
             </div>
        </div>
        :
        <div class="wrapper">
                    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' rel='stylesheet'></link>
                    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css' rel='stylesheet'></link>
                    <div  style= {{width:'60%', position: 'absolute', top:'6em', bottom:'10px', left:'-90px', zIndex:'3'}}>
                    <div class="col-lg-8 mx-auto" style= {{overflow:'scroll', height:'600px'}}>
                        <ul class="list-group shadow">
                            
                            {this.createDriverList()}
                            
                        </ul>
                    </div>
                    </div>
                </div>
            }

        <div id='map' style={{ height: '100vh', width: '100%', position: 'relative' }}></div>
        </div>
        )    
    }

}




const SearchEntry = ({ tripID,name, origin, dest, price, time, rating, confirmHandler, selectHandler,originCoord, destCoord}) => {


    // give the server a trip id, and a rider id 
    const handleSelect= () => {
        confirmHandler({})
        // const riderID = JSON.parse(sessionStorage.getItem('user')).sub
        // const requestMsg = {
        //     riderID: riderID, //rider id 
        //     tripID: tripID, 
        //     origin:  originCoord,
        //     destination: destCoord,
        // }
        // fetch('http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/rider_join', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(requestMsg),
        // })
        // //response is one trip obejct
        // .then((response)=>{
        //     response.text().then((r) =>{
        //         console.log("r",r) 
        //     })
            
        // })
        // .catch(()=> {
        //     console.log(requestMsg)
        //     console.log('failed to contact the backend')
           
            
        // })
    }
    return(
        <li class="list-group-item"  onClick={()=>{selectHandler(originCoord, destCoord)}}>
            <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                <div class="media-body order-2 order-lg-1" style={{marginLeft:0}}>
                    <h5 class="mt-0 font-weight-bold mb-2">{ name }</h5>
                    <p class="font-italic text-muted mb-0 small">Origin: { origin } </p>
                    <p class="font-italic text-muted mb-0 small">Desination: { dest } </p>
                    <p class="font-italic text-muted mb-0 small"> Time: { time } </p>
                    <p class="font-italic text-muted mb-0 small"> Price: { price } </p>
                    <div class="d-flex align-items-center justify-content-between mt-1">

                        <ul class="list-inline small">
                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                        </ul>
                    </div>
                </div>
                <div><img src={ninja} alt="Generic placeholder" class="ninja" ></img></div>
                {/* <Link id="tripManager" to="/upcoming-trips"> */}
                    <button type="button" class= "select-button" onClick={handleSelect}>Join</button>
                    {/* </Link>  */}
               
            </div>
        </li>
    )
}


export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wKxvY-md1NKI3l2IODJ7LquYkK-D6zs&libraries=places",
"//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"])(RiderPost);