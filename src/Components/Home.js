import React, {Component} from 'react';
import AccountBalance from "./AccountBalance";
import {Link} from "react-router-dom";

class Home extends Component{
    render(){
        return(
            <div>
                <img src= "https://www.umassmed.edu/globalassets/human-resources/documents/immigration/images/bank-logo.jpg" alt="bank" width="250" height="250"/>
                <h1>Bank of React</h1>

                <Link to="/userProfile">User Profile</Link>
                <div></div>
                <Link to="/login">Login</Link>
                <div></div>
                <Link to="/debits">Debits</Link>
                <div></div>
                <Link to="/credits">Credits</Link>

                <AccountBalance accountBalance={Math.ceil(this.props.accountBalance*100)/100}/>
            </div>
        );
    }  
}

export default Home;