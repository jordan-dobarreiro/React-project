import React from 'react';
import { Link } from 'react-router-dom'
import findWallet from '../services/findWallet.js';

export default class MainPage extends React.Component {

    constructor() {
        super()
        this.state = {
            balance: 0
        }
    }

    componentDidMount() {
        var wallet = findWallet(parseInt(localStorage.getItem('user')));
        console.log(localStorage.getItem('wallet'));
        this.setState({
            balance: wallet.balance
        })
    }

    render() {
        return (
            <div>
                Balance: {this.state.balance / 100}€
                <br />
                <button color="primary" size="lg" block>
                    <Link to="/addcard" className="nav-link">
                        Add a card
                    </Link>
                </button>
                <br />
                <button color="secondary" size="lg" block>
                    <Link to="/modifycard" className="nav-link">
                        Edit a card
                    </Link>
                </button>
                <br />
                <button variant="success" size="lg" block>
                    <Link to="/withdrawal" className="nav-link">
                        Withdraw money
                    </Link>
                </button>
                <br />
                <button variant="dark" size="lg" block>
                    <Link to="/deposit" className="nav-link">
                        Deposit money
                    </Link>
                </button>
                <br />
                <button variant="info" size="lg" block>
                    <Link to="/transfer" className="nav-link">
                        Make a transfer
                    </Link>
                </button>
            </div>
        )
    }
}