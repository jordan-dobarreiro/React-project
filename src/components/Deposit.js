import React from 'react';
import findWallet from '../services/findWallet.js';
import * as money from '../services/api/moneyMovement.js';

export default class Withdrawal extends React.Component {

    constructor() {
        super()
        this.state = {
            balance: 0,
            amount: 0,
            cards: []
        }
    }

    componentDidMount() {
        var wallet = findWallet(parseInt(localStorage.getItem('user')));
        console.log(localStorage.getItem('wallet'));
        var cards = JSON.parse(localStorage.getItem('cards'));
        var user = parseInt(localStorage.getItem('user'));
        var user_cards = cards.filter(x => x.user_id === user);
        this.setState({
            balance: wallet.balance,
            cards: user_cards
        })
    }

    deposit = () => {
        console.log(this.state)
        if (this.state.amount > 0) {
            money.deposit(parseInt(localStorage.getItem('user')), this.state.amount * 100);
            alert("money has been deposited");
            window.location.reload(false);
        } else {
            alert("wrong entry");
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
                Choose the card you want to deposit with:
                    <select value={this.state.value} onChange={this.onFieldChanged}>
                    <option value=""></option>
                    {this.state.cards.map(card => {
                        return <option value={card.id}>{card.brand} ****-****-****-{card.last_4} Expires: {card.expired_at}</option>
                    })}
                </select>
                <br />
                Amount:
                <input id="amount" type="number" onChange={this.onFieldChanged} />
                <br />
                <button onClick={this.deposit}>Deposit</button>
            </div>
        )
    }
}