export default function findCard(id_card) {
    var cards = JSON.parse(localStorage.getItem('cards'));
    var card = cards.find(x => x.id === id_card);
    return card;
}