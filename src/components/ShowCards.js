import React from 'react';
import Card from './Card.js';


export default class ShowCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            last4: '',
            brand: '',
            expiredAt: '',
            year: null,
            month: null
        }
    }
    render() {
        var cards = JSON.parse(localStorage.getItem('cards'));
        var user = parseInt(localStorage.getItem('user'));
        var user_cards = cards.filter(x => x.user_id === user);
        if (user_cards.length === 0) {
            return (
                <div>
                    You don't have any card !
                </div>
            )
        }
        else {
            for (let card of user_cards) {
                return (
                    <div>
                        {user_cards.map(card => (
                            <Card source={card.id} key={card.id} />
                        ))}
                    </div>
                );
            }
        }
    }
}