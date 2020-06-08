import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Debit extends Component{
    
    render(){
        return(
            <div>
                <h1>Debits</h1>
                <ul>
                    {this.props.debits.map((debit,idx)=> <li key={debit.id}>{debit.description + " $" + debit.amount + " " + debit.date.substring(0,10)}</li>)}
                </ul>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }
}

export default Debit;