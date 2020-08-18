
import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './rider.css'
import './driver.css'
import TopNav from './TopNav';
import RiderPost from './RiderPost';
import DriverPost from './DriverPost';
import './login.css';
import { Route } from "react-router-dom";


class HomePage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state ={
    //         isRider : true
    //     }

    // }
    // // call back function
    // toggleFunction= () => {
    //     this.setState({isRider : !this.state.isRider})
       
    // }


    render() {
        return (
         <div>
             {/* construct a toggle props to pass to TopNav */}
        <TopNav history={ this.props.history } toggle = {this.toggleFunction} switch={ true }/>
             {/* {this.state.isRider === true ?
             <RiderPost />
                :
                <DriverPost />
             } */}
            {/* <Route path="/HomePage/RiderSearch" component={RiderPost} /> */}
             <Route path="/HomePage/RiderPost" component={RiderPost} />
             <Route path="/HomePage/DriverPost" component={DriverPost} />
         </div>
       
        )    
    }
}

export default HomePage;