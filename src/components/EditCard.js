import React from 'react';
import * as api from '../services/api/editCard.js';
import findCard from '../services/findCard.js';
import { YearPicker, MonthPicker } from 'react-dropdown-date';

class EditCard extends React.Component {
    constructor() {
        super()
        this.state = {
            id: 0,
            userId: 0,
            last4: '',
            brand: '',
            expiredAt: '',
            errors: {},
            newLast4: '',
            newBrand: '',
            newExpiredAt: '',
            year: '',
            month: '',
        }
    }

    componentDidMount() {
        var card = findCard(parseInt(this.props.match.params.cardId));
        this.setState({
            id: card.id,
            userId: card.user_id,
            last4: card.last_4,
            brand: card.brand,
            expiredAt: card.expired_at,
        })

    }

    edit = () => {
        console.log(this.state)
        const response = api.checkCard(this.state.userId, this.state.newLast4, this.state.newBrand, this.state.newExpiredAt);
        if (response.status === "success") {
            api.edit(this.state.id, this.state.userId, this.state.newLast4, this.state.newBrand, this.state.newExpiredAt);
            alert("edited information");
            this.props.history.push('/modifycard');
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
            <div className="Home mt-3 text-center">
                <h2>Edit Card</h2>
                <div className="my-3">
                    <div className="form-group">
                        <label htmlFor="newLast4">New last 4: </label>
                        <input className="ml-2" type="text" id="newLast4" onChange={this.onFieldChanged} />
                    </div>
                </div>
                Brand:
                    <select id="newBrand" placeholder="Choose the brand" onChange={this.onFieldChanged}>
                    <option value=''>Keep the brand</option>
                    <option value="Visa">Visa</option>
                    <option value="Master Card">Master Card</option>
                    <option value="amex">American Express</option>
                    <option value="Union Pay">Union Pay</option>
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
                        this.setState({ year: year });
                        this.setState({ newExpiredAt: year + "-" + String(parseInt(this.state.month) + 1) });
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
                        this.setState({ month: month });
                        this.setState({ newExpiredAt: this.state.year + "-" + String(parseInt(month) + 1) });
                        console.log(month);
                    }}
                    id={'month'}
                    name={'month'}
                />
                <br />
                <div>
                    <button onClick={this.edit}>Edit</button>
                </div>
                <br />
            </div>
        )
    }
}

export default EditCard;