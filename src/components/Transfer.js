import React from 'react';
import findUser from '../services/findUser.js';
import findUserEmail from '../services/findUserEmail.js';
import findWallet from '../services/findWallet.js';
import * as money from '../services/api/moneyMovement.js';
import * as api from '../services/api/createAccount.js';

export default class Transfer extends React.Component {

    constructor() {
        super()
        this.state = {
            balance: 0,
            emailUser1: '',
            emailUser2: '',
            amount: 0
        }
    }

    componentDidMount() {
        var user = findUser(parseInt(localStorage.getItem('user')));
        var wallet = findWallet(parseInt(localStorage.getItem('user')));
        console.log(localStorage.getItem('wallet'));
        this.setState({
            emailUser1: user.email,
            balance: wallet.balance
        })

    }

    transfer = () => {
        console.log(this.state)
        const response = api.signUp(this.state.emailUser2);
        if (response.status === "failure") {
            if ((this.state.balance >= this.state.amount * 100) && (this.state.amount > 0) && (this.state.emailUser1 !== this.state.emailUser2)) {
                var user = findUserEmail(this.state.emailUser2);
                money.transfer(parseInt(localStorage.getItem('user')), user.id, this.state.amount * 100);
                alert("money has been transfered");
                window.location.reload(false);
            } else {
                alert("not enough money in balance or wrong entry");
            }
        } else {
            alert("email is wrong");
        }
    }

    onFieldChanged = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div>
                Balance: {this.state.balance / 100}€
                <br />
                Receiver's email:
                <input id="emailUser2" type="text" onChange={this.onFieldChanged} />
                <br />
                Amount (Max : {this.state.balance / 100}€):
                <input id="amount" type="number" onChange={this.onFieldChanged} />
                <br />
                <button onClick={this.transfer}>Send</button>
            </div>
        )
    }
}