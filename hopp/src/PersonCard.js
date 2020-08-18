import React, { Component} from 'react';
import './tripManager.css'
import person_pic from './person_pic.png'
import star_pic from './star_pic.png'


class PersonCard extends Component {
    constructor(props) {
        super(props);
     
    }

    sendData =() =>{
        this.props.removeCallback( this.props.myIndex);
    }
    
    render() {
        return (
                <div >
                          <div class="personCard">
                        <img id='profile' alt="profile" src={person_pic} />
                        <div class="personInfoContainer">
                            <div class="nameStars">
                                <h3 id='infoTitle'> {this.props.personName} </h3>
                                <img class='star' alt="star" src={star_pic} />
                                <img class='star' alt="star" src={star_pic} />
                            </div>
                            <h3> Contact: {this.props.contact} </h3>
                            <h3> Stop Origin: {this.props.stopOrigin} </h3>
                            <h3> Stop Destination: {this.props.stopDest} </h3>
                         </div>
                            { this.props.isRider  ? 
                                <button class='remove-button' onClick={()=>{
                                    this.sendData()

                                }}> Leave Trip </button>
                                 :  
                                 <button class='remove-button' onClick={()=>{
                                    this.sendData()

                                }}> Remove </button>
                             } 
                           
                            </div>
                </div>
      
        )
    }
}

export default PersonCard;