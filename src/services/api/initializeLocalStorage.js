import { users } from './json/users.js';
import { wallets } from './json/wallets.js';
import { deposits } from './json/deposits.js';
import { withdrawals } from './json/withdrawals.js';
import { transfers } from './json/transfers.js';
import { cards } from './json/cards.js';

function initializeLocalStorage() {
    var users_raw = localStorage.getItem('users');
    if (typeof users_raw === 'undefined' || users_raw == null) {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('wallets', JSON.stringify(wallets));
        localStorage.setItem('deposits', JSON.stringify(deposits));
        localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
        localStorage.setItem('transfers', JSON.stringify(transfers));
        localStorage.setItem('cards', JSON.stringify(cards));
    }
}

export default initializeLocalStorage;