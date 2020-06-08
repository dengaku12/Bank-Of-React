import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import Login from './Components/Login';
import Debit from './Components/Debits';
import Credit from './Components/Credits'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state ={
      accountBalance: 0,
      currentUser: {
        userName: "Dengaku",
        memberSince: "06/19/2007",
      },
      debits: [],
      credits: []
    }
  }

  componentDidMount(){
    axios.get("https://moj-api.herokuapp.com/debits")
    .then((res)=>{
      const data = res.data;
      this.setState({debits:data});
      let total=this.state.accountBalance;
      data.forEach((e)=>(total-=e.amount));
      this.setState({accountBalance: total});
    })
    .catch((err)=>console.log(err));

    axios.get("https://moj-api.herokuapp.com/credits")
    .then((res)=>{
      const data = res.data;
      this.setState({credits:data});
      let total=this.state.accountBalance;
      data.forEach((e)=>(total+=e.amount));
      this.setState({accountBalance: Math.ceil(total*100)/100});
    })
    .catch((err)=>console.log(err));
   
  }

  mockLogin = (loginInfo) =>{
    const newUser = {...this.state.currentUser}
    newUser.userName = loginInfo.userName
    this.setState({currentUser:newUser})
  }

  addDebit = (debit) =>{
    let date = new Date();
    debit.date = date.toISOString().substring(0,10);
    let newDebit = [debit,...this.state.debits];
    this.setState({debits: newDebit});
    this.setState({accountBalance: this.state.accountBalance-debit.amount});
  }

  addCredit = (credit) =>{
    let date = new Date();
    credit.date = date.toISOString().substring(0,10);
    let newCredit = [credit,...this.state.credits];
    this.setState({credits: newCredit});
    this.setState({accountBalance: this.state.accountBalance+ parseInt(credit.amount)});
  }
    render(){
      const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
      const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>
      );
      const LoginComponent = () => (<Login user={this.state.currentUser} mockLogin={this.mockLogin} {...this.props} />);
      const DebitComponent = () => (<Debit debits={this.state.debits} addDebit = {this.addDebit}/>)
      const CreditComponent = () => (<Credit credits={this.state.credits} addCredit={this.addCredit}/> )
      return(
        <Router>
          <Switch>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LoginComponent}/>
            <Route exact path="/debits" render={DebitComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
          </Switch>
        </Router>
      );
    }
}

export default App;
