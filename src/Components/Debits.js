import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Debit extends Component{
    constructor(){
        super();
        this.state = {
            info: {
                description: "",
                amount: 0,
                date: ""
            },
            redirect: false
        };
    }
    handleChange = (e) =>{
        const updatedDebit = {...this.state.info};
        const inputField = e.target.name;
        const inputValue= e.target.value;
        updatedDebit[inputField] = inputValue;
        this.setState({info: updatedDebit});
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.addDebit(this.state.info);
        this.setState({redirect: true});
    };
    
    render(){
        if(this.state.redirect)
        {
            return <Redirect to="/"/>;
        }
        return(
            <div>
                <h1>Add A Debit</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="amount">Debit Amount</label>
                        <input type="number" name="amount" value={this.state.info.amount} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" value={this.state.info.description} onChange={this.handleChange}/>
                    </div>
                    <button>Submit</button>
                </form>
                <h2>Debits</h2>
                <ul>
                    {this.props.debits.map((debit,idx)=> <li key={debit.id}>{debit.description + " $" + debit.amount + " " + debit.date.substring(0,10)}</li>)}
                </ul>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }
}

export default Debit;