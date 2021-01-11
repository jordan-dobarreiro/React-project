import findWallet from '../findWallet.js';
import findHighId from '../findHighId.js';
import removeElement from '../removeElement.js';

function withdrawal(user_id_i, amount_i) {
    var wallet = findWallet(user_id_i);
    removeElement('wallets', wallet.id);
    wallet.balance -= amount_i;
    var wallets_raw = localStorage.getItem('wallets');
    var wallets = JSON.parse(wallets_raw);
    wallets.push(wallet);
    localStorage.setItem('wallets', JSON.stringify(wallets));

    var withdrawals_raw = localStorage.getItem('withdrawals');
    var withdrawals = JSON.parse(withdrawals_raw);
    var maxid_withdrawal = findHighId(withdrawals);
    withdrawals.push({
        id: maxid_withdrawal + 1,
        wallet_id: wallet.id,
        amount: amount_i,
    });
    localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
}

function deposit(user_id_i, amount_i) {
    var wallet = findWallet(user_id_i);
    removeElement('wallets', wallet.id);
    wallet.balance += amount_i;
    var wallets_raw = localStorage.getItem('wallets');
    var wallets = JSON.parse(wallets_raw);
    wallets.push(wallet);
    localStorage.setItem('wallets', JSON.stringify(wallets));

    var deposits_raw = localStorage.getItem('deposits');
    var deposits = JSON.parse(deposits_raw);
    var maxid_deposit = findHighId(deposits);
    deposits.push({
        id: maxid_deposit + 1,
        wallet_id: wallet.id,
        amount: amount_i,
    });
    localStorage.setItem('deposits', JSON.stringify(deposits));
}

function transfer(user_id1_i, user_id2_i, amount_i) {
    var wallet1 = findWallet(user_id1_i);
    removeElement('wallets', wallet1.id);
    wallet1.balance -= amount_i;

    var wallet2 = findWallet(user_id2_i);
    removeElement('wallets', wallet2.id);
    wallet2.balance += amount_i;

    var wallets_raw = localStorage.getItem('wallets');
    var wallets = JSON.parse(wallets_raw);
    wallets.push(wallet1);
    wallets.push(wallet2);
    localStorage.setItem('wallets', JSON.stringify(wallets));

    var transfers_raw = localStorage.getItem('transfers');
    var transfers = JSON.parse(transfers_raw);
    var maxid_transfer = findHighId(transfers);
    transfers.push({
        id: maxid_transfer + 1,
        debited_wallet_id: wallet1.id,
        credited_wallet_id: wallet2.id,
        amount: amount_i,
    });
    localStorage.setItem('transfers', JSON.stringify(transfers));
}

export { withdrawal, deposit, transfer };