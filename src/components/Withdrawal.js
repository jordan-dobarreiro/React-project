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

    withdrawal = () => {
        console.log(this.state)
        if ((this.state.balance >= this.state.amount * 100) && this.state.amount > 0) {
            money.withdrawal(parseInt(localStorage.getItem('user')), this.state.amount * 100);
            alert("money has been withdrawn");
            window.location.reload(false);
        } else {
            alert("not enough money in balance or wrong entry");
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
                Choose the card you want to deposit on:
                    <select value={this.state.value} onChange={this.onFieldChanged}>
                    <option value=""></option>
                    {this.state.cards.map(card => {
                        return <option value={card.id}>{card.brand} ****-****-****-{card.last_4} Expires: {card.expired_at}</option>
                    })}
                </select>
                <br />
                Amount (Max : {this.state.balance / 100}€):
                <input id="amount" type="number" onChange={this.onFieldChanged} />
                <br />
                <button onClick={this.withdrawal}>Withdraw</button>
            </div>
        )
    }
}