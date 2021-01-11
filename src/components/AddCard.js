import React from 'react';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import * as api from '../services/api/createCard.js';
import 'react-dropdown/style.css';


export default class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            last4: '',
            brand: 'visa',
            expiredAt: '',
            year: '',
            month: ''
        }
    }


    addcard = () => {
        console.log(this.state);
        var user = localStorage.getItem('user');
        const response = api.checkCard(user, this.state.last4, this.state.brand, this.state.expiredAt);
        if (response.status === "success") {
            api.createCard(user, this.state.last4, this.state.brand, this.state.expiredAt);
            alert("Card added");
            this.props.history.push('/mainpage');
        } else {
            alert(response.error);
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
                Last 4 digits:
                <input id="last4" type="text" onChange={this.onFieldChanged} />
                <br />
                Brand:
                <select id="brand" placeholder="Choisissez un modèle" onChange={this.onFieldChanged}>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Master Card</option>
                    <option value="amex">American Express</option>
                    <option value="UnionPay">Union Pay</option>
                    <option value="jcb">jcb</option>
                </select>
                <br />
                Expired at:
                <YearPicker
                    defaultValue={'select year'}
                    start={2010}
                    end={2030}
                    reverse
                    required={true}
                    value={this.state.year}
                    onChange={(year) => {
                        this.setState({ year });
                        this.setState({ expiredAt: year + "-" + String(parseInt(this.state.month) + 1) });
                        console.log(year);
                    }}
                    id='year'
                    name='year'
                />
                <MonthPicker

                    defaultValue={'select month'}


                    numeric

                    short

                    caps

                    endYearGiven

                    year={this.state.year}

                    required={true}

                    value={this.state.month}

                    onChange={(month) => {
                        this.setState({ month });
                        this.setState({ expiredAt: this.state.year + "-" + String(parseInt(month) + 1) });
                        console.log(month);
                    }}
                    id={'month'}
                    name={'month'}
                />
                <br />
                <button onClick={this.addcard}>Add card</button>
            </div>
        );
    }
}