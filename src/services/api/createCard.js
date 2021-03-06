import findHighId from '../findHighId.js';

function success(result) {
    return {
        status: "success",
        result: result
    }
}

function failure(error) {
    return {
        status: "failure",
        error: error
    }
}


function checkCard(user, last4, brand, expiredAt) {
    var cards = JSON.parse(localStorage.getItem('cards'));
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var i = 0;
    for (let card of cards) {
        if (card.last_4 === last4 && card.user_id === user && card.brand === brand && card.expired_at === expiredAt) {
            return failure("You already registered this card");
        }

    }

    if (expiredAt !== "") {
        var card_e_at = expiredAt.split("-");
        if (card_e_at[0] < year || (card_e_at[0] === year && card_e_at[1] < month)) {
            return failure("Your card is expired!");
        }
    } else {
        return failure("You have to enter a date");
    }
    if (last4.length !== 4) {
        return failure("You didn't enter 4 digit");
    }
    for (i = 0; i < last4.length; i++) {
        if (!(last4[i] >= '0' && last4[i] <= '9')) {
            return failure('You must only enter digit for Last 4');
        }
    }

    return success();
}

function createCard(user, last4, brand, expiredAt) {
    var cards_raw = localStorage.getItem('cards');
    var cards = JSON.parse(cards_raw);
    var maxid_card = findHighId(cards);
    cards.push({
        id: maxid_card + 1,
        user_id: parseInt(user),
        last_4: last4,
        brand: brand,
        expired_at: expiredAt
    });

    localStorage.setItem('cards', JSON.stringify(cards));
}

export { checkCard, createCard };