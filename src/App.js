import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';


import Navbar from './components/Navbar.js';
import MainPage from './components/MainPage.js';
import Landing from './components/Landing.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import AddCard from './components/AddCard.js';
import Profile from './components/Profile.js';
import Withdrawal from './components/Withdrawal.js';
import Deposit from './components/Deposit.js';
import Transfer from './components/Transfer.js';
import initializeLocalStorage from './services/api/initializeLocalStorage.js';
import ShowCards from './components/ShowCards.js';
import EditCard from './components/EditCard.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    initializeLocalStorage();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="Container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/mainpage" component={MainPage} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addcard" component={AddCard} />
            <Route exact path="/modifycard" component={ShowCards} />
            <Route exact path="/modifycard/edit/:cardId" component={EditCard} />
            <Route exact path="/withdrawal" component={Withdrawal} />
            <Route exact path="/deposit" component={Deposit} />
            <Route exact path="/transfer" component={Transfer} />
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
