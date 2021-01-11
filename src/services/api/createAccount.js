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

function signUp(email) {
    // wait few ms to be realistic
    var users = JSON.parse(localStorage.getItem('users'));

    for (let user of users) {
        if (user.email === email) {
            return failure("A user already exists for this email");
        }
    }

    return success();
}

function inscription(first_name_i, last_name_i, email_i, password_i) {
    var users_raw = localStorage.getItem('users');
    var users = JSON.parse(users_raw);
    var maxid_user = findHighId(users);
    users.push({
        id: maxid_user + 1,
        first_name: first_name_i,
        last_name: last_name_i,
        email: email_i,
        password: password_i,
    });

    var wallet_raw = localStorage.getItem('wallets');
    var wallets = JSON.parse(wallet_raw);
    var maxid_wallet = findHighId(wallets);
    wallets.push({
        id: maxid_wallet + 1,
        id_user: maxid_user + 1,
        balance: 0,
    });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('wallets', JSON.stringify(wallets));
}

export { signUp, inscription };