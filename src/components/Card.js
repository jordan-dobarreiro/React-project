import findCard from '../services/findCard.js';
import findUser from '../services/findUser.js';
import React from 'react';
import removeElement from '../services/removeElement.js';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';


export default class Card extends React.Component {
    constructor(props) {
        super(props);
        var card = findCard(this.props.source);
        var user = findUser(parseInt(localStorage.getItem('user')));
        this.state = {
            id: card.id,
            last_4: card.last_4,
            brand: card.brand,
            expiry: card.expired_at.replace("-", "/"),
            name: user.first_name + " " + user.last_name,
            number: "**** **** **** " + card.last_4,
        }
        console.log(this.state);
    }

    delete = () => {
        console.log(this.state);
        removeElement('cards', this.state.id);
        alert("card deleted !");
        window.location.reload(false);
    }

    render() {
        var id = this.state.id;
        return (
            <div>
                <Cards
                    name={this.state.name}
                    number={this.state.number}
                    expiry={this.state.expiry}
                    cvc="737"
                    preview={true}
                    issuer={this.state.brand}
                />
                <br />
                <button >
                    <Link to={'/modifycard/edit/' + id} >
                        Edit card
                    </Link>
                </button>
                <br />
                <button onClick={this.delete}>Delete</button>
            </div>
        )
    }
}