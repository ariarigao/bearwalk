import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Link, Redirect } from "react-router-dom";
import './account.css';
import TopNav from './TopNav';
import thumb from './thumb.png'
import account from './account.svg'



class AccountPage extends Component {
    constructor(props) {
        super(props);

        const user_info = JSON.parse(sessionStorage.getItem('user'))
       
       
        this.state = {
            signedin: true,
            user_info: user_info,
        }
    }


    logoutHandler() {
        sessionStorage.clear();
        this.props.history.push('/login')
    }

    render() {
        return (

            <div>
                  <div className="topnav">

                <div className="topnav-left">
                        <img src={thumb} alt="thumb" className = "thumb" />
                            <h2 className="logout" onClick={this.logoutHandler.bind(this)}> Log Out </h2>
                            </div>
                                <div >
                    <div className="topnav-right">
                            <Link id="tripManager" to="/upcoming-trips">Upcoming Trips</Link> 
                            <Link id="tripManager" to="/HomePage/RiderPost">HomePage</Link> 
                            <Link to="/account">
                                <img src={account} alt="account" className = "account"/>
                            </Link>
                    </div>
    
                    </div>
                </div> 


                  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet'/>
                <link href='https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.6.95/css/materialdesignicons.css' rel='stylesheet' />
            <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
            <script type='text/javascript' src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'></script>
            <script type='text/javascript'></script>
           <div class="page-content page-container" id="page-content">
    <div class="padding" style= {{padding:'0px'}}>
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile"></img> </div>
                                <h6 class="f-w-600">{this.state.user_info.given_name + ' '+ this.state.user_info.family_name}</h6>
                                <p>Driver</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Full Name</p>
                                          <h6 class="text-muted f-w-400"> {this.state.user_info.given_name + ' '+ this.state.user_info.family_name} </h6>
                                          
                                          
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Username</p>
                                             <h6 class="text-muted f-w-400">{ this.state.user_info.username}</h6>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Phone</p>
                                             <h6 class="text-muted f-w-400">{this.state.user_info.phone_number}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Date of Birth</p>
                                        <h6 class="text-muted f-w-400">{this.state.user_info.birthdate}</h6>
                                    </div>
                            
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Gender</p>
                                        <h6 class="text-muted f-w-400">{this.state.user_info.gender}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Address</p>
                                        <h6 class="text-muted f-w-400">{this.state.user_info.address}</h6>
                                    </div>
                                </div>
                                
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Trips</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Recent</p>
                                        <h6 class="text-muted f-w-400">NYC here we come!</h6>
                                        
                                    </div>
                                   
                                    <div class="col-sm-6">
                                        {/* <p class="m-b-10 f-w-600">Most Viewed</p> */}
                                        {/* <h6 class="text-muted f-w-400">Dinoter husainm</h6> */}
                                      
                                    </div>
                                    <Link to="/HomePage/RiderPost"> 
                                        <button type="button" class= "back-button">Go Back</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div> 
 


        )    
    }

}

export default AccountPage;