import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Credit extends Component{

    render(){
        return(
            <div>
                <h1>Credits</h1>
                <ul>
                    {this.props.credits.map((credit,idx)=> <li key={credit.id}>{credit.description + "\t$" + credit.amount + "\t" + credit.date.substring(0,10)}</li>)}
                </ul>
                <Link to="/">Back to Home</Link>
            </div>
        )
    }
}

export default Credit;