import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './driver.css'
import TopNav from './TopNav';

import './login.css';
import scriptLoader from 'react-async-script-loader';



class DriverPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            originMarkerLoc: {
                lat: 42.3601,
                lng: -71.0589,
            },
            destMarkerLoc: {
                lat: 42.3601,
                lng: -71.0489,
            },
            originName:'',
            destName:'',
            datetime:'',
            detour: '',
            price:'',
            seats:'',
            onSearchPage: false,
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
            const autoCompleteOrigin = new window.google.maps.places.Autocomplete(document.getElementById('originDriver'), options)
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
            const autoCompleteDest = new window.google.maps.places.Autocomplete(document.getElementById('destDriver'), options)
            autoCompleteDest.addListener('place_changed', ()=> {
                try {
                    const destResult = autoCompleteDest.getPlace()
                    this.setState({destName: destResult.formatted_address})
                    const newLoc = {
                        lat: destResult.geometry.location.lat(),
                        lng: destResult.geometry.location.lng(),
                    }
                    this.setState({
                        destMarkerLoc: newLoc,
                    })
                    
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

    // componentDidMount() {
    //     const notificationSocket = new WebSocket("ws://localhost:8080");
    //     notificationSocket.addEventListener('open', ()=>{
    //         console.log("open")
    //         notificationSocket.send("hello server");
    //     });
    //     notificationSocket.addEventListener('message', (e)=>{
    //         console.log(e.data);
    //     });
    //     notificationSocket.addEventListener('close', ()=>{
    //         notificationSocket.send("channel closing");
    //     });

    // }
    
    findPath() {
        const request = {
            origin:this.state.originMarkerLoc,
            destination:this.state.destMarkerLoc,
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

        this.setState({onSearchPage: true})
        console.log(this.state.departureDate)
        const driverID = JSON.parse(sessionStorage.getItem('user')).sub
        // const id = JSON.parse(sessionStorage.getItem('user')).sub
        const requestMsg = {
            driverID: driverID,
            origin: this.state.originMarkerLoc,
            dest: this.state.destMarkerLoc,
            time: this.state.datetime,
            detour: this.state.detour,
            price: this.state.price,
            seats: this.state.seats,
           
        }
        console.log("mule is",this.state.maxDetourMileage)
        fetch('http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/driver_post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestMsg),
        })
        .then(()=>{
            // this.setState({onSearchPage: true})
        })
        .catch(()=> {
            console.log(requestMsg)
            console.log('failed to register the new user\'s data on backend')
            this.setState({
                datetime:'',
                price:'',
                seats:'',
                detour: '',
                
            })
        })
        const alert = window.alertify.alert("Hopp", "You have successfully created the Trip!")
        alert.set('onok', ()=>{window.alertify.success("trip created"); window.alertify.alert().destroy()})
        alert.show()

    }


    // FIXME: disable custom address. only choose from autocorrect
    render() {

        // if (!this.state.onSearchPage) {
            return (
                <div>
                     <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
                    {
                        !this.state.onSearchPage ?
                        <div class = "left" >
                        <div class="wrapper">
                            <div class="container">
                                <div class="questionnaire-title">Offer a Ride!</div>
                                    <form class="signup-form" onSubmit={this.handleSubmit.bind(this)} > 
                                       
                                        <input  type= "text" placeholder= "Origin" id='originDriver' class= "input" required name= 'originName' value={this.state.originName} onChange={ this.handleInput }/>
                                        <input  type= "text" placeholder= "Destination" id='destDriver' class= "input" required name= 'destName' value={this.state.destName} onChange={ this.handleInput }/>
                
                                        <input type="datetime-local" placeholder="Date & Time" class="input" name='datetime' value={this.state.datetime} onChange={ this.handleInput } required /><br/>
                                        <input type= "number" placeholder= "Maximum Detour Mileage" class= "input" name= 'detour' value={this.state.detour} onChange={ this.handleInput }required />
                                        <input type="number" placeholder="Price/Rider" class="input" min ="0" name= 'price' value={this.state.price} onChange={ this.handleInput }required /><br/>
                                        <input type="number" placeholder="Seats Available" class="input" min ="1" name= 'seats'  value={this.state.seats} onChange={ this.handleInput }required /><br/>
                                        <button type="submit" class="btn">Find Riders</button>
                               
                                    </form>
                            </div>
                        </div>
                    </div> :
                // TODO: progress bar upon submission
                
                null
                    }
            <div id='map' style={{ height: '100vh', width: '100%', position: 'relative' }}></div>
                </div>
            )
    }
}




export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wKxvY-md1NKI3l2IODJ7LquYkK-D6zs&libraries=places",
"//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"])(DriverPost);