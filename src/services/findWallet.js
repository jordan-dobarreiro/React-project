export default function findWallet(id_user) {
    var wallets = JSON.parse(localStorage.getItem('wallets'));
    var wallet = wallets.find(x => x.id_user === id_user);
    return wallet;
}