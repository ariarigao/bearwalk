import React, { Component} from 'react';
import './tripManager.css'
import car_pic from './car_pic.png'


class TripCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibiltiy : false,

        }
      

    }

    render() {
        return (
        
        <div class="tripCard" onClick={()=>{
            if (this.props.currSelect !== this.props.myIndex) {
                this.props.handleSwitchTrip(this.props.myIndex)
            }
            }}>
            
            <img src={car_pic} alt="car img" />
        
            <div class="titleTimeContainer">
               
                <h3 id='tripListTitle'> {this.props.tripName}</h3>
                <h3 > {this.props.tripTime} </h3>
               
            </div>
            <h3 class="tripID"> {this.props.tripID} </h3>


            { this.props.currSelect === this.props.myIndex ? 
                <div class= "box"> </div> 
                : 
                null
            }
        
        </div>
        )
    }
}

export default TripCard;