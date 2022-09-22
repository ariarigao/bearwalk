import React, { useEffect, useState, Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { usePopper } from 'react-popper';
import './login.css';
import thumb from "./thumb.png";
import account from "./account.svg";
import SockJS from "sockjs-client";
import Stomp from "stompjs";


class TopNav extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isRider: true,
            user: '',
            notifications: ["this good trip"],
            notificationCounter: 0,
        }

    }

    componentDidMount() {
        // http post registration
        if (sessionStorage.getItem('user') != null) {
            this.registration()
        }
    

    }

          // * call this function when user logs in 
       registration() {
            // * get the current user's token in our case (replace this)
            const userName = JSON.parse(sessionStorage.getItem("user")).sub
            // * post to registration url 
            fetch("http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/registration/" + userName, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: "",
        }).then((res) => {
            this.connectToNotificationsCenter(userName);
        }).catch(()=>{console.log("websocket not connect")})
        }

    

        connectToNotificationsCenter(userName) { // * function that allows an active user to listen for notifications 
            console.log("connecting to notifications...")
            let socket = new SockJS("http://ec2-18-191-83-80.us-east-2.compute.amazonaws.com:8080/notify");
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
                console.log("connected to: " + frame);
                // listen for different types of notifications
                stompClient.subscribe("/topic/notifications/" + userName, (response) => {
                    console.log(response.body)
                    const temp = this.state.notifications
                    temp.push(response.body)
                    this.setState({
                        notifications: temp,
                        notificationCounter: this.state.notificationCounter+1
                    })
                    // render appropriate nottification usind data
                });
            });
        }
    
    logoutHandler() {
        sessionStorage.clear();
        this.props.history.push('/login')
    }

    render() {
        
        return (
            
            <div className="topnav">
                <div className="topnav-left">
                    <img src={thumb} alt="thumb" className = "thumb" />
                    { sessionStorage.getItem('user') != null ? <h2 className="logout" onClick={this.logoutHandler.bind(this)}> Log Out </h2> : null}
                </div>
                { this.props.switch ?
                <div className = "topnav-middle">
                { sessionStorage.getItem('user') != null ? 
               <label class="switch">
                   <input class="switch-input" type="checkbox" onClick={()=>{
                       if (this.state.isRider) {
                           this.props.history.push('/HomePage/DriverPost')
                           this.setState({isRider: false})
                       } else {
                           this.props.history.push('/HomePage/RiderPost')
                           this.setState({isRider: true})
                       }
                   }} />
                    <span class="switch-label" data-on="Driver" data-off="Rider"></span>
                    
                   <span class="switch-handle"></span> 
               </label>
               : null }
           </div>
           :
           null    
            }
                
                <div >
                    { sessionStorage.getItem('user') != null ? 
                    <div className="topnav-right">
                        <Link id="tripManager" to="/upcoming-trips">Upcoming Trips</Link> 
                        
                        <Notification data={ this.state.notifications} counter={ this.state.notificationCounter } setCounter={ (num) => { this.setState({notificationCounter: num})}} />
                
                        <Link to="/account">
                            <img src={account} alt="account" className = "account"/>
                        </Link>
                    </div>
                    : null}
                </div>
            </div> 
        )
    }     
}

const Notification = ({ data, setCounter, counter})=> {

    const createNotificationList = (notificationData) => {
        const items = []
        console.log("thsi is" +  notificationData)
        for (const [index, value] of notificationData.entries()) {
            items.push(<h3 class="notsEntry">{value}</h3>)
        }
        return items
    }

    const [showNotification, setShowNotification] = useState(false)
    
    const handleClick = () =>{
        if (showNotification) {
            setShowNotification(false)
        } else {
            setShowNotification(true)
        }
        setCounter(0)
    }

    return (
        <div id='d'>
            <span id='notify' onClick={ handleClick }>Notifications</span>
            { counter !== 0 && !showNotification ?
                <span class="badge">{counter}</span>
                :
                null
            }

            { showNotification ? 
                <div id="nots">
                    <div id="notsContainer">
                    <h3 id="notshead">Notifications</h3>
                    {createNotificationList(data)}
                    <div style={{height:'300px'}}></div>
                    </div>
                </div>
            : null}
        </div>
    )
}



export default TopNav;